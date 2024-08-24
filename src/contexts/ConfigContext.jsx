import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import {createContext} from "react";

export const ConfigContext = createContext({
    config: {},
    reloadConfig: () => {
        console.warn("No config provider!")
    }
});

export default function Config({children}) {
    const [config, setConfig] = useState({});

    const reloadConfig = async () => {
        let miaConfig = await invoke("get_config");
        setConfig(miaConfig);
    }

    const saveConfig = async (newConfig) => {
        await invoke("save_config", {config: newConfig});
        await reloadConfig();
    }

    const setDocumentAccentColor = () => {
        document.documentElement.style.setProperty("--accent-rgb", fromHexToRGB(config.color));
    }

    useEffect(() => {
        reloadConfig();
        setDocumentAccentColor();
    }, [config.color]);

    return (
        <ConfigContext.Provider value={{
            config: config,
            reloadConfig: reloadConfig,
            saveConfig: saveConfig
        }}>
            {children}
        </ConfigContext.Provider>
    );
}

function fromHexToRGB(rgb) {
    if (!rgb) return "0, 0, 0";
    let ex = (initial) => parseInt(rgb.substring(initial, initial + 2), 16);
    return ex(1) + ", " + ex(3) + ", " + ex(5);
}