"use client";

import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "./useTasks";
import styles from "./Column.module.css";

type ColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onMove: (id: string, direction: "left" | "right") => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
};

export default function Column({
  title,
  status,
  tasks,
  onMove,
  onArchive,
  onDelete,
  onUpdate,
}: ColumnProps) {
  return (
    <section className={styles.column} data-status={status}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </header>
      <div className={styles.list}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveLeft={() => onMove(task.id, "left")}
            onMoveRight={() => onMove(task.id, "right")}
            onArchive={() => onArchive(task.id)}
            onDelete={() => onDelete(task.id)}
            onUpdate={(nextTitle, nextDesc) => onUpdate(task.id, nextTitle, nextDesc)}
            disableMoveLeft={status === "todo"}
            disableMoveRight={status === "done"}
          />
        ))}
        {tasks.length === 0 ? <p className={styles.empty}>No tasks yet</p> : null}
      </div>
    </section>
  );
}
