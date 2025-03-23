"use client";

import React from "react";
import FileExplorer from "@/components/file-explorer/FileExplorer.tsx";
import useCurrentPath from "@/hooks/useCurrentPath.ts";

export default function Page(): React.ReactElement {
    const { path } = useCurrentPath();

    return (
        <div>
            <FileExplorer path={path} />
        </div>
    );
}
