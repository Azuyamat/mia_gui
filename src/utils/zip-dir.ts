import { invoke } from "@tauri-apps/api";

const ZIP_DIR_COMMAND = "zip_dir";

export default async function zipDir(path: string) {
    try {
        const result = await invoke(ZIP_DIR_COMMAND, { path });
        console.log(result);
    } catch (e) {
        console.error(e);
    }
}
