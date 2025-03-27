"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Config } from "@/domain/types/Config.ts";
import { invoke } from "@tauri-apps/api/core";

type ConfigContextProps = {
    config: Config;
    setConfig: (config: Config) => void;
    saveConfig: (value: Config) => void;
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

    const saveConfig = async (newConfig: Config = config) => {
        setConfig(newConfig);
        await invoke("save_config", {
            config: newConfig,
        });
        fetchConfig();
    };

    const fetchConfig = async () => {
        const config: Config = await invoke("get_config");
        setConfig(config);
    };

    useEffect(() => {
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
