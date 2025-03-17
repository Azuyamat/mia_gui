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

    async setFavorite(path: string, state: boolean) {
        const config = await this.getConfig();
        if (state) {
            config.favoriteDirs = config.favoriteDirs.filter(
                (dir) => dir !== path
            );
        } else {
            config.favoriteDirs = [...new Set([...config.favoriteDirs, path])];
        }
        await this.saveConfig(config);
    }
}
