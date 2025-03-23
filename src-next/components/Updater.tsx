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
            {nextUpdate?.available ? (
                <div className={styles.updater}>
                    <h4>Update Available</h4>
                    <p>
                        {nextUpdate.date
                            ? DateFormatter.format(
                                  new Date(
                                      nextUpdate.date
                                          .split(" ")
                                          .slice(0, -1)
                                          .join(" ")
                                  )
                              )
                            : "Date Unknown"}
                    </p>
                    <p>{nextUpdate.body}</p>
                    <button onClick={update}>
                        Update to {nextUpdate.version}
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
