"use client";

import React, { Suspense } from "react";
import useCurrentPath from "@/hooks/useCurrentPath.ts";
import FileExplorer from "@/components/file-explorer/FileExplorer.tsx";

export default function Page(): React.ReactElement {
    return (
        <Suspense>
            <Content />
        </Suspense>
    );
}

function Content(): React.ReactElement {
    const { path } = useCurrentPath();

    return (
        <div>
            <FileExplorer path={path} />
        </div>
    );
}
