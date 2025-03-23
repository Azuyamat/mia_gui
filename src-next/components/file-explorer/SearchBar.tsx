"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/file-explorer/SearchBar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useCurrentPath from "@/hooks/useCurrentPath.ts";

export default function SearchBar(): React.ReactElement {
    const { path, setPath } = useCurrentPath();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPath = e.target.value;
        setQuery(newPath);
    };

    useEffect(() => {
        if (query !== "") {
            setPath(query);
        } else {
            setPath(path || "");
        }
    }, [query, path, setPath]);

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
                    onChange={handleSearch}
                    placeholder="/path/to/search"
                    className={styles.searchBar}
                />
            </div>
            {/*<Peek directory={peek} query={query} />*/}
        </div>
    );
}
