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
    <html lang="en-NZ">
      <body className={poppins.variable}>
        <a className={styles.skipLink} href="#main-content">
          Skip to content
        </a>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <div className={styles.brand}>Dexter</div>
            <SidebarNav />
          </aside>
          <div className={styles.main} id="main-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
