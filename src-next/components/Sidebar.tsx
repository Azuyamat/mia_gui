"use client";

import styles from "../styles/components/Sidebar.module.css";
import React, { JSX } from "react";
import { FaCog, FaFolder, FaFolderOpen, FaHome } from "react-icons/fa";
import Link from "next/link";
import { revealItemInDir } from "@tauri-apps/plugin-opener";
import { useConfig } from "@/contexts/ConfigContext.tsx";

const items: {
    [key: string]: {
        path: string;
        icon: JSX.Element;
    };
} = {
    home: {
        path: "/",
        icon: <FaHome />,
    },
    files: {
        path: "/files",
        icon: <FaFolder />,
    },
    settings: {
        path: "/settings",
        icon: <FaCog />,
    },
};

export default function Sidebar(): React.ReactElement {
    const { config } = useConfig();

    return (
        <div className={styles.sidebar}>
            <ul>
                <section>
                    {Object.keys(items).map((key) => {
                        const { path, icon } = items[key];

                        return (
                            <li key={key}>
                                <Link href={path} className={styles.link}>
                                    {icon}
                                </Link>
                            </li>
                        );
                    })}
                </section>
                {config.outputDir && (
                    <section>
                        <li>
                            <button
                                className={styles.link}
                                title={"Open output directory"}
                                onClick={() => {
                                    if (config.outputDir) {
                                        revealItemInDir(config.outputDir);
                                    }
                                }}
                            >
                                <FaFolderOpen />
                            </button>
                        </li>
                    </section>
                )}
            </ul>
        </div>
    );
}
