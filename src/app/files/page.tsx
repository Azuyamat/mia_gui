"use client";

import React from "react";
import useCurrentPath from "@/hooks/useCurrentPath.ts";

export default function Page(): React.ReactElement {
    const { path } = useCurrentPath();

    return (
        <div>
            {path}
            {/*<FileExplorer path={path} />*/}
        </div>
    );
}
