import { getVersion, getTauriVersion } from "@tauri-apps/api/app";
import {
    checkUpdate,
    installUpdate,
    onUpdaterEvent,
} from "@tauri-apps/api/updater";
import React, { useContext, useEffect, useState } from "react";

import styles from "@/styles/components/Settings.module.css";
import { ToastContext } from "@/contexts/ToastContext";
import { Toast } from "@/domain/types/Toast";
import ToastFactory from "@/domain/factories/ToastFactory";

export default function SettingsInformation(): React.ReactElement {
    const { showToast } = useContext(ToastContext);
    const [information, setInformation] = useState({
        version: "",
        tauriVersion: "",
        update: "",
    });

    useEffect(() => {
        async function updateInformation() {
            const version = await getVersion();
            const tauriVersion = await getTauriVersion();
            const update = await checkUpdate();

            setInformation({
                version: version,
                tauriVersion: tauriVersion,
                update: update?.shouldUpdate ? "Available" : "Up to date",
            });
        }

        updateInformation();
    }, []);

    onUpdaterEvent((event) => {
        const status = event.status;
        let toast: Toast | null = null;
        switch (status) {
            case "PENDING": {
                toast = ToastFactory.createInfoToast("Checking for updates...");
                break;
            }
            case "ERROR": {
                toast = ToastFactory.createErrorToast(
                    "Error checking for updates"
                );
                break;
            }
            case "UPTODATE": {
                break;
            }
            case "DONE": {
                toast = ToastFactory.createSuccessToast("Update installed");
                break;
            }
        }
        toast && showToast(toast);
    });

    const updateAvailable = information.update === "Available";

    return (
        <li>
            <p>
                Mia version{" "}
                <span className={"highlight"}>{information.version}</span>
            </p>
            <p>
                Tauri version{" "}
                <span className={"highlight"}>{information.tauriVersion}</span>
            </p>
            <p>
                Update <span className={"highlight"}>{information.update}</span>
            </p>
            <button
                className={styles.updateButton}
                onClick={installUpdate}
                disabled={!updateAvailable}
            >
                Update
            </button>
        </li>
    );
}
