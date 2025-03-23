"use client";

import React from "react";
import styles from "@/styles/components/file-explorer/Results.module.css";
import { EntriesWithButtons } from "@/components/file-explorer/Entries.tsx";
import { Directory } from "@/domain/types/Directory.ts";

type ResultsProps = {
    directory: Directory | null;
};

export default function Results({
    directory,
}: ResultsProps): React.ReactElement | null {
    if (!directory) {
        return null;
    }

    return (
        <div className={styles.results}>
            <EntriesWithButtons entries={directory.children} />
        </div>
    );
}
