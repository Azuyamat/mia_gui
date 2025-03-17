import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { createContext } from "react";
import { fromHexToRGB } from "@/utils/format-utils";
import ConfigService from "@/domain/services/ConfigService";
import { Config } from "@/domain/types/Config";

export const ConfigContext = createContext<{
    config: Config | null;
    reloadConfig: () => Promise<void>;
    saveConfig: (newConfig: Config) => Promise<void>;
}>({
    config: null,
    reloadConfig: async () => {
        console.warn("No config provider!");
    },
    saveConfig: async () => {
        console.warn("No config provider!");
    },
});

export default function ConfigContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    const [config, setConfig] = useState<Config | null>(null);

    const configService = new ConfigService();

    const reloadConfig = async () => {
        setConfig(await configService.getConfig());
    };

    const saveConfig = async (newConfig: Config) => {
        await configService.saveConfig(newConfig);
        await reloadConfig();
    };

    const setDocumentAccentColor = () => {
        if (config) {
            document.documentElement.style.setProperty(
                "--accent-rgb",
                fromHexToRGB(config.color || "#FFFFFF")
            );
        }
    };

    useEffect(() => {
        reloadConfig();
        setDocumentAccentColor();
    }, [config?.color]);

    return (
        <ConfigContext.Provider
            value={{
                config: config,
                reloadConfig: reloadConfig,
                saveConfig: saveConfig,
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}
