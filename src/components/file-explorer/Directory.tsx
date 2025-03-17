import React, { useState } from "react";
import styles from "@/styles/components/FileExplorer.module.css";
import { FaFolder } from "react-icons/fa";
import ContextMenu from "@/components/file-explorer/ContextMenu";

type DirectoryProps = {
    name: string;
    path: string;
    blacklisted: boolean;
    setDir: (path: string) => void;
};

export default function Directory({
    name,
    path,
    blacklisted,
    setDir,
}: DirectoryProps) {
    const [contextMenuOpen, setContextMenuOpen] = useState(false);

    return (
        <li
            className={styles.directory}
            onContextMenu={(e) => {
                e.preventDefault();
                setContextMenuOpen(true);
            }}
            onClick={() => {
                if (contextMenuOpen) return;
                setDir(path);
            }}
            data-blacklisted={blacklisted}
        >
            <div className={styles.flex}>
                <i>
                    <FaFolder />
                </i>
                <p>{name}</p>
                <p>
                    <span className={styles.path}>{path || ""}</span>
                </p>
            </div>

            <ContextMenu
                open={contextMenuOpen}
                setOpen={setContextMenuOpen}
                path={path}
                isDir={true}
                language={null}
            />
        </li>
    );
}
