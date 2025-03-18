import React from "react";
import styles from "@/styles/components/file-explorer/FileExplorer.module.css";
import SearchBar from "@/components/file-explorer/SearchBar.tsx";

export default function FileExplorer(): React.ReactElement {
    return (
        <div className={styles.fileExplorer}>
            <SearchBar />
        </div>
    );
}
