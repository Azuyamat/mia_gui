import React from "react";
import Link from "next/link";
import styles from "@/styles/components/PathLink.module.css";

export default function PathLink({
    path,
    children,
}: {
    path: string;
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <Link className={styles.link} href={`/files?path=${path}`}>
            {children}
        </Link>
    );
}
