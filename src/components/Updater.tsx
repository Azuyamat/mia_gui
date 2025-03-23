"use client";

import React from "react";
import useUpdater from "@/hooks/useUpdater.ts";
import styles from "@/styles/components/Updater.module.css";
import { DateFormatter } from "@/utils/format-utils.ts";

export default function Updater(): React.ReactElement {
    const { version, tauriVersion, nextUpdate, checkForUpdates, update } =
        useUpdater();

    return (
        <>
            <div className={styles.updater}>
                <h4>Current Version</h4>
                <p>Mia Version: {version}</p>
                <p>Tauri version: {tauriVersion}</p>
            </div>
            {nextUpdate?.manifest ? (
                <div className={styles.updater}>
                    <h4>Update Available</h4>
                    <p>
                        {DateFormatter.format(
                            new Date(
                                nextUpdate.manifest.date
                                    .split(" ")
                                    .slice(0, -1)
                                    .join(" ")
                            )
                        )}
                    </p>
                    <p>{nextUpdate.manifest.body}</p>
                    <button onClick={update}>
                        Update to {nextUpdate.manifest.version}
                    </button>
                </div>
            ) : (
                <div className={styles.updater}>
                    <h4>No Updates Available</h4>
                    <button onClick={checkForUpdates}>Check for updates</button>
                </div>
            )}
        </>
    );
}
