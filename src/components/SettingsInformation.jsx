import {getVersion, getTauriVersion} from "@tauri-apps/api/app";
import {checkUpdate} from "@tauri-apps/api/updater";
import {useEffect, useState} from "react";

export default function SettingsInformation() {
    const [information, setInformation] = useState({
        version: "",
        tauriVersion: "",
        update: ""
    });

    useEffect(() => {
        async function updateInformation(){
            const version = await getVersion();
            const tauriVersion = await getTauriVersion();
            const update = await checkUpdate().catch(() => "No update available");
            setInformation({
                version: version,
                tauriVersion: tauriVersion,
                update: update || "No update available"
            });
        }
        updateInformation();
    }, []);

    return (
        <li>
            <p>Mia version <span className={"highlight"}>{information.version}</span></p>
            <p>Tauri version <span className={"highlight"}>{information.tauriVersion}</span></p>
            <p>Update <span className={"highlight"}>{information.update}</span></p>
        </li>
    )
}