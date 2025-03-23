"use client";

import React, { Suspense } from "react";
import useCurrentPath from "@/hooks/useCurrentPath.ts";
import FileExplorer from "@/components/file-explorer/FileExplorer.tsx";

export default function Page(): React.ReactElement {
    const { path } = useCurrentPath();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <FileExplorer path={path} />
            </div>
        </Suspense>
    );
}
