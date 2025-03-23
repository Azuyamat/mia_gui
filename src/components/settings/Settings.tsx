import styles from "@/styles/components/Settings.module.css";
import React from "react";
import SettingsInformation from "@/components/settings/SettingsInformation";

export default function Settings() {
    return (
        <div className={styles.container}>
            <ul className={styles.settings}>
                <SettingsInformation />
            </ul>
        </div>
    );
}
