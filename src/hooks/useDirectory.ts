"use client";

import { GetDirBuilder, GetDirOptions } from "@/utils/get-dir.ts";
import { Directory } from "@/domain/types/Directory.ts";
import { useEffect, useState } from "react";

export default function useDirectory(
    path: string | null,
    options: GetDirOptions = GetDirBuilder.DEFAULT_OPTIONS
) {
    const [directory, setDirectory] = useState<Directory | null>(null);

    const clearDirectory = () => {
        setDirectory(null);
    };

    useEffect(() => {
        if (!path) {
            setDirectory(null);
            return;
        }

        new GetDirBuilder(path, options)
            .build()
            .then((info) => {
                setDirectory(info);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [path]);

    return { directory, clearDirectory };
}
