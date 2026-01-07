"use client";

import { useState } from "react";
import ui from "../ui/ui.module.css";
import styles from "./TaskForm.module.css";

type TaskFormProps = {
  onAdd: (title: string, description?: string) => void;
};

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form className={`${styles.form} ${ui.card}`} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <input
          className={ui.field}
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className={`${ui.field} ${styles.textarea}`}
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className={styles.actions}>
        <button className={`${ui.btn} ${ui.btnPrimary}`} type="submit">
          Add task
        </button>
      </div>
    </form>
  );
}
