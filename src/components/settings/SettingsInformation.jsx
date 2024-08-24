import {getVersion, getTauriVersion} from "@tauri-apps/api/app";
import {checkUpdate, installUpdate, onUpdaterEvent} from "@tauri-apps/api/updater";
import {useContext, useEffect, useState} from "react";

import styles from "../../styles/components/Settings.module.css";
import {ToastContext} from "../../contexts/ToastContext.jsx";

export default function SettingsInformation() {
    const {showToast} = useContext(ToastContext);
    const [information, setInformation] = useState({
        version: "",
        tauriVersion: "",
        update: ""
    });

    useEffect(() => {
        async function updateInformation(){
            const version = await getVersion();
            const tauriVersion = await getTauriVersion();
            const update = await checkUpdate();
            console.log(update);
            setInformation({
                version: version,
                tauriVersion: tauriVersion,
                update: update?.shouldUpdate ? "Available" : "Up to date"
            });
        }
        updateInformation();
    }, []);

    onUpdaterEvent((event) => {
        const status = event.status;
        const toastMessage =
            status === "DONE" ? {message: "Update complete!", type: "success"} :
            status === "ERROR" ? {message: "Update failed!", type: "error"} :
            status === "PENDING" ? {message: "Update in progress...", type: "info"} : null;
        if (toastMessage) showToast(toastMessage.message, toastMessage.type);
    });

    return (
        <li>
            <p>Mia version <span className={"highlight"}>{information.version}</span></p>
            <p>Tauri version <span className={"highlight"}>{information.tauriVersion}</span></p>
            <p>Update <span className={"highlight"}>{information.update}</span></p>
            {information.update === "Available" ? (
                <button className={styles.updateButton} onClick={installUpdate}>Update</button>
            ) : (
                <button className={styles.updateButton} disabled={true}>Update</button>
            )}
        </li>
    )
}