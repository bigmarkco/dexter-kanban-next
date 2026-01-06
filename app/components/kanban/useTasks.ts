"use client";

import { useEffect, useReducer, useState } from "react";

export type TaskStatus = "todo" | "doing" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  archived: boolean;
  createdAt: number;
  updatedAt: number;
};

type Action =
  | { type: "hydrate"; payload: Task[] }
  | { type: "add"; payload: Task }
  | { type: "update"; payload: { id: string; title: string; description?: string } }
  | { type: "move"; payload: { id: string; direction: "left" | "right" } }
  | { type: "archive"; payload: { id: string } }
  | { type: "restore"; payload: { id: string } }
  | { type: "delete"; payload: { id: string } };

const STATUS_ORDER: TaskStatus[] = ["todo", "doing", "done"];

const seedTasks: Task[] = [
  {
    id: "seed-1",
    title: "Set up Dexter board",
    description: "Create columns and seed tasks",
    status: "todo",
    archived: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "seed-2",
    title: "Try moving tasks",
    description: "Use the move buttons to change status",
    status: "doing",
    archived: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "seed-3",
    title: "Review archive",
    description: "Send a task to archive to see it there",
    status: "done",
    archived: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "add":
      return [action.payload, ...state];
    case "update":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
              updatedAt: Date.now(),
            }
          : task
      );
    case "move":
      return state.map((task) => {
        if (task.id !== action.payload.id) return task;
        const currentIndex = STATUS_ORDER.indexOf(task.status);
        const nextIndex =
          action.payload.direction === "left"
            ? Math.max(0, currentIndex - 1)
            : Math.min(STATUS_ORDER.length - 1, currentIndex + 1);
        return currentIndex === nextIndex
          ? task
          : { ...task, status: STATUS_ORDER[nextIndex], updatedAt: Date.now() };
      });
    case "archive":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, archived: true, updatedAt: Date.now() } : task
      );
    case "restore":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, archived: false, updatedAt: Date.now() } : task
      );
    case "delete":
      return state.filter((task) => task.id !== action.payload.id);
    default:
      return state;
  }
}

function createTask(title: string, description?: string): Task {
  const now = Date.now();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `task-${now}-${Math.random().toString(16).slice(2)}`;
  return {
    id,
    title,
    description,
    status: "todo",
    archived: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function useTasks() {
  const [hydrated, setHydrated] = useState(false);
  const [tasks, dispatch] = useReducer(reducer, seedTasks);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("dexter-tasks");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Task[];
        dispatch({ type: "hydrate", payload: parsed });
      } catch {
        dispatch({ type: "hydrate", payload: seedTasks });
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem("dexter-tasks", JSON.stringify(tasks));
  }, [tasks, hydrated]);

  const addTask = (title: string, description?: string) => {
    if (!title.trim()) return;
    dispatch({ type: "add", payload: createTask(title.trim(), description?.trim() || undefined) });
  };

  const updateTask = (id: string, title: string, description?: string) => {
    dispatch({
      type: "update",
      payload: { id, title: title.trim(), description: description?.trim() || undefined },
    });
  };

  const moveTask = (id: string, direction: "left" | "right") => {
    dispatch({ type: "move", payload: { id, direction } });
  };

  const archiveTask = (id: string) => dispatch({ type: "archive", payload: { id } });
  const restoreTask = (id: string) => dispatch({ type: "restore", payload: { id } });
  const deleteTask = (id: string) => dispatch({ type: "delete", payload: { id } });

  return {
    tasks,
    addTask,
    updateTask,
    moveTask,
    archiveTask,
    restoreTask,
    deleteTask,
  };
}
