import { useEffect, useState } from "react";
import { getTauriVersion, getVersion } from "@tauri-apps/api/app";
import {
    checkUpdate,
    installUpdate,
    UpdateResult,
} from "@tauri-apps/api/updater";
import { useToast } from "@/contexts/ToastContext.tsx";
import ToastFactory from "@/domain/factories/ToastFactory.ts";

export default function useUpdater() {
    const { addToast, editToast } = useToast();
    const [version, setVersion] = useState<string>();
    const [tauriVersion, setTauriVersion] = useState<string>();
    const [nextUpdate, setNextUpdate] = useState<UpdateResult>();

    const checkForUpdates = async () => {
        const toastId = addToast(
            ToastFactory.createInfoToast("Checking for updates...")
        );
        setVersion(await getVersion());
        setTauriVersion(await getTauriVersion());
        setNextUpdate(await checkUpdate());
        editToast(
            toastId,
            ToastFactory.createSuccessToast("Update check complete")
        );
    };

    const update = async () => {
        addToast(ToastFactory.createInfoToast("Updating..."));
        await installUpdate();
    };

    useEffect(() => {
        checkForUpdates();
    }, []);

    return { version, tauriVersion, nextUpdate, checkForUpdates, update };
}
