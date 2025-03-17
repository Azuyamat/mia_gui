import styles from "@/styles/components/FileExplorer.module.css";
import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { splitBySlash } from "@/utils/format-utils";
import React from "react";
import File from "@/components/file-explorer/File";
import Directory from "@/components/file-explorer/Directory";
import { DirectoryInfo } from "@/domain/types/DirectoryInfo";
import ToastFactory from "@/domain/factories/ToastFactory";

type FileExplorerProps = {
    dir: DirectoryInfo;
    setDir: (dir: string) => void;
    path: string;
};

export default function FileExplorer({ dir, setDir, path }: FileExplorerProps) {
    const { showToast } = useContext(ToastContext); // TODO : Fix 'any' type

    if (!dir?.exists && path?.length > 0) {
        const toast = ToastFactory.createErrorToast("Directory doesn't exist");
        showToast(toast);
    }
    if (!dir || !dir.exists) return <Skeleton />;

    const splitPath = splitBySlash(dir.path);
    const splitPathsAnchors = splitPath.map((path, i) => {
        if (path.trim().length < 1) return null;
        return (
            <button
                className={styles.pathButton}
                key={i}
                onClick={() => {
                    let pathToHere = splitPath.slice(0, i + 1).join("\\");
                    pathToHere += "\\";
                    setDir(pathToHere);
                }}
            >
                {path}
            </button>
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.context}>
                <div className={styles.row}>
                    <div className={styles.important}>{splitPathsAnchors}</div>
                </div>
            </div>
            <ul className={styles.repository}>
                {dir.paths
                    .sort((a, b) => {
                        if (a.entry_type === b.entry_type) return 0;
                        if (a.entry_type === "Directory") return -1;
                        return 1;
                    })
                    .map((entry, i) => {
                        const type = entry.entry_type.toLowerCase();
                        if (type === "directory")
                            return (
                                <Directory
                                    key={i}
                                    name={entry.name}
                                    path={entry.path}
                                    blacklisted={entry.blacklisted}
                                    setDir={setDir}
                                />
                            );
                        return (
                            <File
                                key={i}
                                name={entry.name}
                                languageName={entry.language?.name}
                                blacklisted={entry.blacklisted}
                                extension={entry.extension}
                                path={entry.path}
                            />
                        );
                    })}
            </ul>
        </div>
    );
}

function Skeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.context}>
                <div className={styles.row}>
                    <div
                        className={styles.important}
                        data-skeleton={"true"}
                    ></div>
                </div>
            </div>
            <ul className={styles.repository}>
                <li className={styles.directory} data-skeleton={"true"} />
                <li className={styles.directory} data-skeleton={"true"} />
                <li className={styles.directory} data-skeleton={"true"} />
                <li className={styles.directory} data-skeleton={"true"} />
                <li className={styles.directory} data-skeleton={"true"} />
                <li className={styles.directory} data-skeleton={"true"} />
            </ul>
        </div>
    );
}
