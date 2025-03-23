import { useToast } from "@/contexts/ToastContext.tsx";
import ToastFactory from "@/domain/factories/ToastFactory.ts";
import { invoke } from "@tauri-apps/api/core";
import { Config } from "@/domain/types/Config.ts";

const ZIP_DIR_COMMAND = "zip_dir";

export default function useZipDir() {
    const { addToast, editToast } = useToast();

    return async (path: string) => {
        const start = Date.now();
        const id = addToast(
            ToastFactory.createInfoToast("Zipping directory...")
        );
        try {
            const result: ZipDirResult | undefined = await invoke(
                ZIP_DIR_COMMAND,
                { path }
            );
            const elapsed = Date.now() - start;
            const elapsedSeconds = elapsed / 1000;
            if (!result) {
                throw new Error("Failed to zip directory!");
            }
            editToast(
                id,
                ToastFactory.createSuccessToast(
                    `Directory zipped in ${elapsedSeconds} seconds!`
                )
            );
        } catch (error) {
            editToast(
                id,
                ToastFactory.createErrorToast("Failed to zip directory!")
            );
        }
    };
}

type ZipDirResult = {
    name: string;
    base_path: string;
    config: Config;
    output_path: string;
};
