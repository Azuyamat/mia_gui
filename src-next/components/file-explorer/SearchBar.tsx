"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/file-explorer/SearchBar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useCurrentPath from "@/hooks/useCurrentPath.ts";

export default function SearchBar(): React.ReactElement {
    const { path, setPath } = useCurrentPath();
    const [query, setQuery] = useState("");

    useEffect(() => {
        setQuery(path || "");
    }, [path]);

    return (
        <div className={styles.searchContainer}>
            <div>
                <FaMagnifyingGlass id={styles.searchIcon} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setPath(query);
                        }
                    }}
                    onBlur={() => {
                        setPath(query);
                    }}
                    placeholder="/path/to/search"
                    className={styles.searchBar}
                />
            </div>
        </div>
    );
}
