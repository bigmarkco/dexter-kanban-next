"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../layout.module.css";

const links = [
  { href: "/board", label: "Board" },
  { href: "/archive", label: "Archive" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        const className = `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`;
        return (
          <Link key={link.href} className={className} href={link.href} aria-current={isActive ? "page" : undefined}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
