import styles from "@/styles/layouts/SelectedLayout.module.css";
import React from "react";

export default function SelectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className={styles.container}>{children}</div>;
}
