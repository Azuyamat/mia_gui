import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import {createContext} from "react";
import styles from "./Config.module.css";

export const ConfigContext = createContext({
    config: {},
    reloadConfig: () => {
        console.log("No config provider!")
    }
});

export default function Config({children}) {
    const [config, setConfig] = useState({});

    async function reloadConfig() {
        console.log("Reloading config...");
        let miaConfig = await invoke("get_config");
        setConfig(miaConfig);
    }

    async function saveConfig(newConfig) {
        console.log("Saving config...");
        await invoke("save_config", {config: newConfig});
        await reloadConfig();
    }

    useEffect(() => {
        reloadConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{
            config: config,
            reloadConfig: reloadConfig,
            saveConfig: saveConfig
        }}>
            <div className={styles.config} style={{'--accent-color': config.color}}>
                {children}
            </div>
        </ConfigContext.Provider>
    );

}