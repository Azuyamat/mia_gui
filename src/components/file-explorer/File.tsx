import React, { useEffect, useState } from "react";
import styles from "@/styles/components/FileExplorer.module.css";
import ContextMenu from "@/components/file-explorer/ContextMenu";
import { Language } from "@/domain/types/Language";
import LanguageService from "@/domain/services/LanguageService";

type FileProps = {
    name: string;
    languageName: string;
    blacklisted: boolean;
    extension: string;
    path: string;
};

export default function File({
    name,
    languageName,
    blacklisted,
    extension,
    path,
}: FileProps) {
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [language, setLanguage] = useState<Language | null>(null);
    const languageService = new LanguageService();

    useEffect(() => {
        const fetchLanguage = async () => {
            const language = await languageService.getLanguage(languageName);
            setLanguage(language);
        };

        fetchLanguage();
    }, [languageName]);

    if (!language) return null;

    const { icon, color } = language;

    return (
        <li
            className={styles.file}
            style={{ "--color": color } as React.CSSProperties}
            data-blacklisted={blacklisted}
            onContextMenu={(e) => {
                e.preventDefault();
                setContextMenuOpen(true);
            }}
        >
            <div className={styles.flex}>
                <i>{React.createElement(icon)}</i>
                <p>{name.replace(`.${extension}`, "")}</p>
            </div>

            <p className={styles.extension}>{extension}</p>

            <ContextMenu
                open={contextMenuOpen}
                setOpen={setContextMenuOpen}
                path={path}
                isDir={false}
                language={language}
            />
        </li>
    );
}
