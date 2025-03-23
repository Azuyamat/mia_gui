import styles from "../styles/components/Sidebar.module.css";
import React, { JSX } from "react";
import { FaCog, FaFolder, FaHome } from "react-icons/fa";
import Link from "next/link";

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
            </ul>
        </div>
    );
}
