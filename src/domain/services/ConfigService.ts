import { Config } from "@/domain/types/Config";

const GET_CONFIG_COMMAND = "get_config";
const SAVE_CONFIG_COMMAND = "save_config";

export default class ConfigService {
    async getConfig(): Promise<Config> {
        const { invoke } = await import("@tauri-apps/api/tauri");
        return await invoke(GET_CONFIG_COMMAND);
    }

    async saveConfig(config: Config) {
        const { invoke } = await import("@tauri-apps/api/tauri");
        return await invoke(SAVE_CONFIG_COMMAND, { config });
    }
}
