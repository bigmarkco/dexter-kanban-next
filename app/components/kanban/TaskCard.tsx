"use client";

import { useEffect, useRef, useState } from "react";
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
  disableMoveLeft?: boolean;
  disableMoveRight?: boolean;
};

export default function TaskCard({
  task,
  onMoveLeft,
  onMoveRight,
  onArchive,
  onDelete,
  onUpdate,
  disableMoveLeft,
  disableMoveRight,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const editButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasEditing = useRef(false);
  const cardTitleId = `task-${task.id}-card-title`;
  const editTitleId = `task-${task.id}-edit-title`;
  const editDescId = `task-${task.id}-edit-desc`;

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current?.focus();
    } else if (wasEditing.current) {
      editButtonRef.current?.focus();
    }
    wasEditing.current = isEditing;
  }, [isEditing]);

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(title, description);
    setIsEditing(false);
  };

  return (
    <article className={`${ui.card} ${styles.card}`} aria-labelledby={cardTitleId}>
      {isEditing ? (
        <div className={styles.editFields}>
          <h3 className="srOnly" id={cardTitleId}>
            {task.title}
          </h3>
          <label className="srOnly" htmlFor={editTitleId}>
            Task title
          </label>
          <input
            className={ui.field}
            id={editTitleId}
            ref={titleInputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <label className="srOnly" htmlFor={editDescId}>
            Task description
          </label>
          <textarea
            className={`${ui.field} ${styles.textarea}`}
            id={editDescId}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
          />
        </div>
      ) : (
        <div className={styles.copy}>
          <h3 className={styles.title} id={cardTitleId}>
            {task.title}
          </h3>
          {task.description ? <p className={styles.description}>{task.description}</p> : null}
        </div>
      )}

      <div className={styles.actions}>
        <div className={styles.moveGroup}>
          {disableMoveLeft !== true ? (
            <button
              className={`${ui.btn} ${ui.btnGhost}`}
              type="button"
              onClick={onMoveLeft}
              aria-label={`Move "${task.title}" left`}
            >
              {"\u2190"}
            </button>
          ) : null}
          {disableMoveRight !== true ? (
            <button
              className={`${ui.btn} ${ui.btnGhost}`}
              type="button"
              onClick={onMoveRight}
              aria-label={`Move "${task.title}" right`}
            >
              {"\u2192"}
            </button>
          ) : null}
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
              <button
                className={`${ui.btn} ${ui.btnGhost}`}
                type="button"
                onClick={() => setIsEditing(true)}
                ref={editButtonRef}
              >
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
              if (window.confirm(`Delete "${task.title}"?`)) onDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
