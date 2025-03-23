"use client";

import React from "react";
import useCurrentPath from "@/hooks/useCurrentPath.ts";
import FileExplorer from "@/components/file-explorer/FileExplorer.tsx";

export default function Page(): React.ReactElement {
    const { path } = useCurrentPath();

    return (
        <div>
            <FileExplorer path={path} />
        </div>
    );
}
