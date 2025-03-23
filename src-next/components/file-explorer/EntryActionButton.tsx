import React from "react";
import styles from "@/styles/components/file-explorer/Entries.module.css";

type ActionButton = React.ReactElement<HTMLButtonElement>;

type EntryActionButtonProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EntryActionButton(
    props: EntryActionButtonProps
): ActionButton {
    const { children, ...rest } = props;

    return (
        <button {...rest} className={styles.entryActionButton}>
            {children}
        </button>
    );
}
