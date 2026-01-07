"use client";

import PageShell from "../components/PageShell";
import Column from "../components/kanban/Column";
import TaskForm from "../components/kanban/TaskForm";
import { useTasks } from "../components/kanban/useTasks";
import styles from "./page.module.css";

const COLUMNS = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
] as const;

export default function BoardPage() {
  const { tasks, addTask, moveTask, archiveTask, deleteTask, updateTask } = useTasks();
  const activeTasks = tasks.filter((task) => !task.archived);

  return (
    <PageShell>
      <h1 className="srOnly">Board</h1>
      <div className={styles.board}>
        <TaskForm onAdd={addTask} />
        <div className={styles.columns}>
          {COLUMNS.map((column) => (
            <Column
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={activeTasks.filter((task) => task.status === column.status)}
              onMove={moveTask}
              onArchive={archiveTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
