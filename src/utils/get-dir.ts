import { DirectoryInfo } from "@/domain/types/DirectoryInfo";
import { invoke } from "@tauri-apps/api";

const GET_DIR_COMMAND = "get_dir";

export async function getDir(path: string): Promise<DirectoryInfo> {
    return invoke(GET_DIR_COMMAND, { path });
}
