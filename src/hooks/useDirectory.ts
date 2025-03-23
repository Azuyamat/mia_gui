"use client";

import { GetDirBuilder, GetDirOptions } from "@/utils/get-dir.ts";
import { Directory, Entry, EntryType } from "@/domain/types/Directory.ts";
import { useEffect, useState } from "react";

export default function useDirectory(
    path: string | null,
    options: GetDirOptions = GetDirBuilder.DEFAULT_OPTIONS
) {
    const [searchDuration, setSearchDuration] = useState<number | null>(null);
    const [directory, setDirectory] = useState<Directory | null>(null);

    const clearDirectory = () => {
        setDirectory(null);
    };

    const getByType = (entryType: EntryType): Entry[] => {
        return (
            directory?.children.filter(
                (entry) => entry.entryType === entryType
            ) || []
        );
    };

    useEffect(() => {
        if (!path) {
            setDirectory(null);
            return;
        }

        const getDirectory = async () => {
            const start = Date.now();
            new GetDirBuilder(path, options)
                .build()
                .then((info) => {
                    setDirectory(info);
                    setSearchDuration(Date.now() - start);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        getDirectory();
    }, [path]);

    return { directory, clearDirectory, getByType, searchDuration };
}
