"use client";

import React from "react";
import styles from "@/styles/components/file-explorer/FileExplorer.module.css";
import SearchBar from "@/components/file-explorer/SearchBar.tsx";
import Results from "@/components/file-explorer/Results.tsx";
import useDirectory from "@/hooks/useDirectory.ts";

type FileExplorerProps = {
    path: string | null;
};

export default function FileExplorer({
    path,
}: FileExplorerProps): React.ReactElement {
    const { directory } = useDirectory(path);

    return (
        <div className={styles.fileExplorer}>
            <SearchBar />
            <Results directory={directory} />
        </div>
    );
}
