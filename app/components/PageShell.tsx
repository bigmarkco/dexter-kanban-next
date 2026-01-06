import type { ReactNode } from "react";
import styles from "./PageShell.module.css";

type PageProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageProps) {
  return <main className={styles.page}>{children}</main>;
}
