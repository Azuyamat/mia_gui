import styles from "@/styles/components/Settings.module.css";
import { FaTimes } from "react-icons/fa";
import React from "react";

type Option = {
    name: string;
    value: string;
};

type CustomSelectMenuProps = {
    options: Option[];
    id: string;
    children?: React.ReactNode;
};

export default function CustomSelectMenu({
    options,
    id,
    children,
}: CustomSelectMenuProps) {
    return (
        <div className={styles.menu}>
            {children || (
                <input
                    type="text"
                    placeholder={`Add ${id.replace("_", " ")}...`}
                    id={id}
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") return;

                        // TODO : Add the value to the options
                    }}
                />
            )}
            <ul className={styles.options}>
                {options.map((option, i) => {
                    const optionName = option.name;
                    return (
                        <li key={i}>
                            {optionName}
                            <div className={styles.buttons}>
                                <button
                                    id={`${optionName}|||${id}`}
                                    onClick={() => {}} // TODO : Remove the value from the options
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
