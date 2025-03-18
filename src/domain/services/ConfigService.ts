import { Config } from "@/domain/types/Config";
import { invoke } from "@tauri-apps/api";

const GET_CONFIG_COMMAND = "get_config";
const SAVE_CONFIG_COMMAND = "save_config";

export default class ConfigService {
    async getConfig(): Promise<Config> {
        return await invoke(GET_CONFIG_COMMAND);
    }

    async saveConfig(config: Config) {
        return await invoke(SAVE_CONFIG_COMMAND, { config });
    }
}
