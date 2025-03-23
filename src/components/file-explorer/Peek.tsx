import React from "react";
import styles from "@/styles/components/file-explorer/SearchBar.module.css";
import { Directory } from "@/domain/types/Directory.ts";
import { SimpleEntries } from "@/components/file-explorer/Entries.tsx";
import { EntrySort } from "@/domain/enums/EntrySort.ts";

type PeekProps = {
    directory: Directory | null;
    query: string;
};

export default function Peek({
    directory,
    query,
}: PeekProps): React.ReactElement | null {
    if (!directory) return null;

    return (
        <div className={styles.peek}>
            <SimpleEntries
                entries={directory.children}
                sortedBy={EntrySort.BY_NAME}
                query={query}
                maxEntries={5}
            />
        </div>
    );
}
