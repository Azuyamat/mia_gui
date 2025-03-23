import { useEffect, useState } from "react";
import { useToast } from "@/contexts/ToastContext.tsx";
import ToastFactory from "@/domain/factories/ToastFactory.ts";
import { getTauriVersion, getVersion } from "@tauri-apps/api/app";
import { check, Update } from "@tauri-apps/plugin-updater";

export default function useUpdater() {
    const { addToast, editToast } = useToast();
    const [version, setVersion] = useState<string>();
    const [tauriVersion, setTauriVersion] = useState<string>();
    const [nextUpdate, setNextUpdate] = useState<Update | null>(null);

    const checkForUpdates = async () => {
        const toastId = addToast(
            ToastFactory.createInfoToast("Checking for updates...")
        );
        setVersion(await getVersion());
        setTauriVersion(await getTauriVersion());
        setNextUpdate(await check());
        editToast(
            toastId,
            ToastFactory.createSuccessToast("Update check complete")
        );
    };

    const update = async () => {
        addToast(ToastFactory.createInfoToast("Updating..."));
        if (nextUpdate) {
            await nextUpdate.downloadAndInstall();
        }
    };

    useEffect(() => {
        checkForUpdates();
    }, []);

    return { version, tauriVersion, nextUpdate, checkForUpdates, update };
}
