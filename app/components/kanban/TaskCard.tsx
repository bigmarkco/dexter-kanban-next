"use client";

import { useState } from "react";
import type { Task } from "./useTasks";
import ui from "../ui/ui.module.css";
import styles from "./TaskCard.module.css";

type TaskCardProps = {
  task: Task;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onUpdate: (title: string, description?: string) => void;
};

export default function TaskCard({
  task,
  onMoveLeft,
  onMoveRight,
  onArchive,
  onDelete,
  onUpdate,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(title, description);
    setIsEditing(false);
  };

  return (
    <article className={`${ui.card} ${styles.card}`}>
      {isEditing ? (
        <div className={styles.editFields}>
          <input
            className={ui.field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className={`${ui.field} ${styles.textarea}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
          />
        </div>
      ) : (
        <div className={styles.copy}>
          <h3 className={styles.title}>{task.title}</h3>
          {task.description ? <p className={styles.description}>{task.description}</p> : null}
        </div>
      )}

      <div className={styles.actions}>
        <div className={styles.moveGroup}>
          <button className={`${ui.btn} ${ui.btnGhost}`} type="button" onClick={onMoveLeft}>
            ←
          </button>
          <button className={`${ui.btn} ${ui.btnGhost}`} type="button" onClick={onMoveRight}>
            →
          </button>
        </div>
        <div className={styles.metaActions}>
          {isEditing ? (
            <>
              <button className={`${ui.btn} ${ui.btnPrimary}`} type="button" onClick={handleSave}>
                Save
              </button>
              <button className={`${ui.btn} ${ui.btnGhost}`} type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className={`${ui.btn} ${ui.btnGhost}`} type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className={`${ui.btn} ${ui.btnGhost}`} type="button" onClick={onArchive}>
                Archive
              </button>
            </>
          )}
          <button
            className={`${ui.btn} ${ui.btnDanger}`}
            type="button"
            onClick={() => {
              if (window.confirm("Delete this task?")) onDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
