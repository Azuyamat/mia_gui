"use client";

import {
    ReactNode,
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";
import { Directory } from "@/domain/types/Directory.ts";
import { useConfig } from "@/contexts/ConfigContext.tsx";
import { getDir } from "@/utils/get-dir.ts";

type FileExplorerContextProps = {
    currentPath: string | undefined;
    directoryInfo: Directory | null;

    setCurrentPath: (path: string) => void;
};

const FileExplorerContext = createContext<FileExplorerContextProps | undefined>(
    undefined
);

export const FileExplorerProvider = ({ children }: { children: ReactNode }) => {
    const { config } = useConfig();
    const [currentPath, setCurrentPath] = useState<string | undefined>(
        config.defaultDir
    );
    const [directoryInfo, setDirectoryInfo] = useState<Directory | null>(null);

    useEffect(() => {
        if (currentPath) {
            getDir(currentPath)
                .then((info) => {
                    setDirectoryInfo(info);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [currentPath]);

    return (
        <FileExplorerContext.Provider
            value={{
                currentPath,
                directoryInfo,
                setCurrentPath,
            }}
        >
            {children}
        </FileExplorerContext.Provider>
    );
};

export const useFileExplorer = () => {
    const context = useContext(FileExplorerContext);

    if (!context) {
        throw new Error(
            "useFileExplorer must be used within a FileExplorerProvider"
        );
    }

    return context;
};
