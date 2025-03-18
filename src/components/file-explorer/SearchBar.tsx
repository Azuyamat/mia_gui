"use client";

import React, { useEffect, useState } from "react";
import { useFileExplorer } from "@/contexts/FileExplorerContext.tsx";
import styles from "@/styles/components/file-explorer/SearchBar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Directory, EntryType } from "@/domain/types/Directory.ts";
import { FaFile, FaFolder } from "react-icons/fa";
import { GetDirBuilder } from "@/utils/get-dir.ts";
import { compare } from "@/utils/compare.ts";

export default function SearchBar(): React.ReactElement {
    const { setCurrentPath } = useFileExplorer();
    const [query, setQuery] = useState<string>("");
    const [peek, setPeek] = useState<Directory>();

    const handlePeek = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);

        if (query.length === 0) {
            setPeek(undefined);
            return;
        }

        try {
            const peek = await new GetDirBuilder(query).fuzzy(true).build();
            setPeek(peek);
        } catch (error) {
            console.error(error);
            setPeek(undefined);
        }
    };

    const handleSearch = () => {
        setCurrentPath(query);
        setQuery("");
        setPeek(undefined);
    };

    return (
        <div className={styles.searchContainer}>
            <div>
                <FaMagnifyingGlass id={styles.searchIcon} />
                <input
                    type="text"
                    value={query}
                    onChange={handlePeek}
                    placeholder="/path/to/search"
                    className={styles.searchBar}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    // onBlur={handleSearch}
                />
            </div>
            <Peek />
        </div>
    );

    function Peek(): React.ReactElement | null {
        if (!peek) {
            return null;
        }

        const [sorted, setSorted] = useState<Directory["children"]>([]);

        useEffect(() => {
            setSorted(
                peek.children
                    .sort((a, b) => {
                        if (
                            a.entryType === EntryType.FILE &&
                            b.entryType === EntryType.DIRECTORY
                        ) {
                            return 1;
                        }
                        if (
                            a.entryType === EntryType.DIRECTORY &&
                            b.entryType === EntryType.FILE
                        ) {
                            return -1;
                        }
                        return 0;
                    })
                    .sort((a, b) => {
                        return compare(a.name, query) - compare(b.name, query);
                    })
            );
        }, [peek.children, query]);

        return (
            <div className={styles.peek}>
                <ul>
                    {sorted
                        .map((path) => (
                            <li key={path.path}>
                                <span>
                                    {path.entryType === EntryType.FILE ? (
                                        <FaFile />
                                    ) : (
                                        <FaFolder />
                                    )}
                                </span>
                                <span>{path.name}</span>
                            </li>
                        ))
                        .slice(0, 5)}
                </ul>
            </div>
        );
    }
}
