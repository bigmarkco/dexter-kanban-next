import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import SidebarNav from "./components/SidebarNav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dexter",
  description: "A simple Kanban learning app",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <div className={styles.brand}>Dexter</div>
            <SidebarNav />
          </aside>
          <div className={styles.main}>{children}</div>
        </div>
      </body>
    </html>
  );
}
