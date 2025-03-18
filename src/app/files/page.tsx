import React from "react";
import FileExplorer from "@/components/file-explorer/FileExplorer.tsx";
import { FileExplorerProvider } from "@/contexts/FileExplorerContext.tsx";

export default function Page(): React.ReactElement {
    return (
        <div>
            <FileExplorerProvider>
                <FileExplorer />
            </FileExplorerProvider>
        </div>
    );
}
