"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useConfig } from "@/contexts/ConfigContext.tsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useCurrentPath() {
    const { config } = useConfig();
    const search = useSearchParams();
    const path = search.get("path") || config.defaultDir || null;
    const pathname = usePathname();
    const router = useRouter();

    const setPath = (path: string) => {
        const params = new URLSearchParams(search.toString());
        params.set("path", path);

        const url = `${pathname}?${params.toString()}`;
        router.push(url);
    };

    useEffect(() => {
        const newPath = search.get("path") || config.defaultDir;
        if (newPath && newPath !== path) {
            setPath(newPath);
        }
    }, [search]);

    return { path, setPath };
}
