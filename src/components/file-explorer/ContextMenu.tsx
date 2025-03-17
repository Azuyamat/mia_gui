import { AiFillStar } from "react-icons/ai";
import { FaFileZipper } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { BiCode } from "react-icons/bi";
import openInIde from "@/utils/open-in-ide";
import ConfigService from "@/domain/services/ConfigService";
import styles from "@/styles/components/FileExplorer.module.css";
import zipDir from "@/utils/zip-dir";
import { Language } from "@/domain/types/Language";
import { Config } from "@/domain/types/Config";
import { FaFile, FaFolder } from "react-icons/fa";

type ContextMenuProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    path: string;
    isDir: boolean;
    language: Language | null;
};

const useFetchData = (open: boolean) => {
    const configService = new ConfigService();

    const [config, setConfig] = useState<Config | null>();

    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            setConfig(await configService.getConfig());
        };

        fetchData();
    }, [open]);

    return { config };
};

export default function ContextMenu({
    open,
    setOpen,
    path,
    isDir,
    language = null,
}: ContextMenuProps): React.ReactElement | null {
    const { config } = useFetchData(open);

    if (!open || !config) return null;

    const configService = new ConfigService();
    const isFavorite = () => config.favoriteDirs.includes(path);
    const icon = language?.icon || isDir ? FaFolder : FaFile;

    return (
        <div
            style={
                {
                    "--context-color": language?.color || "#767676",
                } as React.CSSProperties
            }
            className={styles.contextMenuFatWrapper}
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
            }}
        >
            <div className={styles.contextMenu}>
                <h3>
                    {React.createElement(icon)} {path}
                </h3>
                <p>Context actions for {language?.name || "file"}</p>
                {!isDir && <ul></ul>}
                {isDir && (
                    <ul>
                        <li
                            onClick={() =>
                                configService.setFavorite(path, true)
                            }
                        >
                            <AiFillStar />{" "}
                            {isFavorite() ? "Unfavorite" : "Favorite"}
                        </li>
                        <li onClick={() => zipDir(path)}>
                            <FaFileZipper /> Zip
                        </li>
                        {config.ides.map((ide, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => openInIde(path, ide.command)}
                                >
                                    <BiCode /> Open with {ide.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}
