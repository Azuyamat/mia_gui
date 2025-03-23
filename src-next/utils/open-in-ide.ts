import { invoke } from "@tauri-apps/api";

const OPEN_IN_IDE_COMMAND = "open_in_ide";

export default async function openInIde(path: string, ide: string = "idea") {
    await invoke(OPEN_IN_IDE_COMMAND, {
        path,
        ide,
    });
}
