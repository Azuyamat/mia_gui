"use client";

import React from "react";
import styles from "@/styles/components/ContextMenu.module.css";
import { useContextMenu } from "@/contexts/ContextMenuContext.tsx";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default function ContextMenu(): React.ReactElement | null {
    const { content, isVisible, toggleVisibility } = useContextMenu();

    if (!content) {
        return null;
    }

    return (
        <div className={styles.contextMenu} data-is-visible={isVisible}>
            <button onClick={toggleVisibility} id={styles.toggleButton}>
                {isVisible ? <FaAnglesRight /> : <FaAnglesLeft />}
            </button>
            <div className={styles.content}>{content}</div>
        </div>
    );
}
