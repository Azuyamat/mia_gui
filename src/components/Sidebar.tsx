import styles from "../styles/components/Sidebar.module.css";
import { FaCog, FaFolder, FaHome, FaStar } from "react-icons/fa";
import React, { JSX, useContext } from "react";
import { ConfigContext } from "@/contexts/ConfigContext";
import {
    compareTwoPaths,
    getLastValidElement,
    splitBySlash,
} from "@/utils/format-utils";

const items: {
    [key: string]: JSX.Element;
} = {
    files: <FaHome />,
    settings: <FaCog />,
};

type SidebarProps = {
    selected: string;
    setSelected: (selected: string) => void;
    getDir: (dir: string) => void;
    currentPath: string | null;
};

export default function Sidebar({
    selected,
    setSelected,
    getDir,
    currentPath,
}: SidebarProps): React.ReactElement {
    const { config } = useContext(ConfigContext);

    return (
        <div className={styles.container}>
            <ul>
                {Object.keys(items).map((item) => {
                    return (
                        <li
                            key={item}
                            data-selected={selected === item.toLowerCase()}
                            onClick={() => {
                                setSelected(item.toLowerCase());
                            }}
                        >
                            <span>{items[item]}</span> {item}
                        </li>
                    );
                })}
                <li className={styles.divider} />
                {currentPath &&
                    config?.favoriteDirs?.map((dir) => {
                        return (
                            <li
                                key={dir}
                                data-selected={compareTwoPaths(
                                    currentPath,
                                    dir
                                )}
                                onClick={() => {
                                    setSelected("files");
                                    getDir(dir);
                                }}
                            >
                                <span>
                                    <FaStar />
                                </span>{" "}
                                {splitBySlash(dir).pop()}
                            </li>
                        );
                    })}
                <li className={styles.divider} />
                {config?.defaultDir && currentPath && (
                    <li
                        data-selected={compareTwoPaths(
                            currentPath,
                            config.defaultDir
                        )}
                        onClick={() => {
                            setSelected("files");
                            getDir(config?.defaultDir);
                        }}
                    >
                        <span>
                            <FaFolder />
                        </span>{" "}
                        {getLastValidElement(config.defaultDir)}
                    </li>
                )}
                {config?.outputDir && currentPath && (
                    <li
                        data-selected={compareTwoPaths(
                            currentPath,
                            config.outputDir
                        )}
                        onClick={() => {
                            setSelected("files");
                            if (config.outputDir) getDir(config.outputDir);
                        }}
                    >
                        <span>
                            <FaFolder />
                        </span>{" "}
                        {getLastValidElement(config.outputDir)}
                    </li>
                )}
            </ul>
        </div>
    );
}
