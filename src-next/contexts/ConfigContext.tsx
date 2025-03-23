"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Config } from "@/domain/types/Config.ts";

type ConfigContextProps = {
    config: Config;
    setConfig: (config: Config) => void;
    saveConfig: () => void;
};

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

const initialConfig: Config = {
    naming: ":name",
    outputDir: undefined,
    blacklistedFileNames: [],
    blacklistedFolderNames: [],
    blacklistedFileExtensions: [],

    defaultDir: undefined,
    color: undefined,
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<Config>(initialConfig);

    const saveConfig = async () => {
        if (typeof window === "undefined" || !config) {
            return;
        }

        const { invoke } = await import("@tauri-apps/api/tauri");

        await invoke("save_config", config);
    };

    useEffect(() => {
        const fetchConfig = async () => {
            if (typeof window === "undefined") {
                return;
            }

            const { invoke } = await import("@tauri-apps/api/tauri");
            const config: Config = await invoke("get_config");
            setConfig(config);
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        if (config.color) {
            document.documentElement.style.setProperty(
                "--accent",
                config.color
            );
        }
    }, [config]);

    return (
        <ConfigContext.Provider value={{ config, setConfig, saveConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);

    if (!context) {
        throw new Error("useConfig must be used within a ConfigProvider");
    }

    return context;
};
