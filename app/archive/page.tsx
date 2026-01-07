"use client";

import PageShell from "../components/PageShell";
import { useTasks } from "../components/kanban/useTasks";
import ui from "../components/ui/ui.module.css";
import styles from "./page.module.css";

export default function ArchivePage() {
  const { tasks, restoreTask, deleteTask } = useTasks();
  const archived = tasks.filter((task) => task.archived);

  return (
    <PageShell>
      <div className={styles.archive}>
        <h1>Archive</h1>
        {archived.length === 0 ? (
          <p className={styles.empty}>No archived tasks yet.</p>
        ) : (
          <ul className={styles.list}>
            {archived.map((task) => (
              <li key={task.id} className={styles.item}>
                <div className={styles.copy}>
                  <h2>{task.title}</h2>
                  {task.description ? <p>{task.description}</p> : null}
                </div>
                <div className={styles.actions}>
                  <button className={`${ui.btn} ${ui.btnPrimary}`} type="button" onClick={() => restoreTask(task.id)}>
                    Restore
                  </button>
                  <button
                    className={`${ui.btn} ${ui.btnDanger}`}
                    type="button"
                    onClick={() => {
                      if (window.confirm("Delete this task?")) deleteTask(task.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
