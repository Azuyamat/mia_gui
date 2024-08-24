import styles from "../../styles/components/Settings.module.css"
import {useContext, useEffect, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {ConfigContext} from "../../contexts/ConfigContext.jsx";
import {ToastContext} from "../../contexts/ToastContext.jsx";
import SettingsInformation from "./SettingsInformation.jsx";
import SettingCard from "./SettingCard.tsx";

export default function Settings() {
    const {config, saveConfig} = useContext(ConfigContext);
    const {showToast} = useContext(ToastContext);

    const [changes, setChanges] = useState(false);
    const [dynamicConfig, setDynamicConfig] = useState(config);

    function handleInput(e) {
        const id = e.target.id;
        const previousValue = dynamicConfig[id];
        const value = e.target.value;
        if (previousValue === value) return;
        setDynamicConfig(prevState => {
            return {
                ...prevState,
                [id]: value
            }
        });
        setChanges(true);
    }

    function addValue(e) {
        const id = e.target.id;
        const value = e.target.value;
        if (dynamicConfig[id].includes(value)) return;
        setDynamicConfig(prevState => {
            return {
                ...prevState,
                [id]: [value, ...prevState[id]]
            }
        })
        setChanges(true);
    }

    function removeValue(e) {
        const id = e.currentTarget.id.split("|||");
        const option = id[0];
        const type = id[1];
        setDynamicConfig(prevState => {
            return {
                ...prevState,
                [type]: prevState[type].filter(item => item?.name !== option && item !== option)
            }
        })
        setChanges(true);
    }

    useEffect(() => {
        const saveConfigShortcut = (e) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                saveConfig(dynamicConfig);
                setChanges(false);
                showToast("Config saved", "success");
            }
        }
        window.addEventListener("keydown", saveConfigShortcut);

        return () => {
            window.removeEventListener("keydown", saveConfigShortcut);
        }
    }, [dynamicConfig]);

    const list = [
        {
            name: "Naming convention",
            details: [":name - Name given", ":date - Current date"],
            placeholder: "Enter convention...",
            value: dynamicConfig.naming,
            id: "naming"
        }
    ]

    return (
        <div className={styles.container}>
            {changes && <button className={styles.save} onClick={() => {
                saveConfig(dynamicConfig);
                setChanges(false);
                showToast("Config saved", "success");
            }}>Save config</button>}
            <ul className={styles.settings}>
                <SettingCard title={"Theme color"}>
                    <input type="text" id={"color"} onBlur={handleInput}
                           onInput={(e) => {
                               const color = e.currentTarget.value;
                               const preview = document.getElementById(styles.preview);
                               preview.style.backgroundColor = color;

                           }} defaultValue={dynamicConfig.color || ""} placeholder={"Enter color..."}
                           autoComplete={"off"}
                           spellCheck={false}/>
                    <div id={styles.preview} style={{'background': dynamicConfig.color || "white"}}/>
                </SettingCard>
                <SettingCard title={"Naming convention"} details={[":name - Name given", ":date - Current date"]}>
                    <input type="text" spellCheck={false} autoComplete={"off"} placeholder={"Enter convention..."}
                           defaultValue={dynamicConfig.naming} id={"naming"} onBlur={handleInput}/>
                </SettingCard>
                {list.map((item, i) => {
                    return (
                        <SettingCard key={i} title={item.name} details={item.details}>
                            <input type="text" spellCheck={false} autoComplete={"off"} placeholder={item.placeholder}
                                   defaultValue={item.value} id={item.id} onBlur={handleInput}/>
                        </SettingCard>
                    )
                })}
                <SettingCard title={"Output directory"} details={"Selected directory is used by default"}>
                    <input type="text" spellCheck={false} autoComplete={"off"} placeholder={"Enter directory..."}
                           defaultValue={dynamicConfig.output_dir || ""} id={"output_dir"} onBlur={handleInput}/>
                </SettingCard>
                <SettingCard title={"Default directory"} details={"This is the directory that is opened by default"}>
                    <input type="text" spellCheck={false} autoComplete={"off"} placeholder={"Enter directory..."}
                           defaultValue={dynamicConfig.default_dir || ""} id={"default_dir"} onBlur={handleInput}/>
                </SettingCard>
                <SettingCard title={"Blacklisted file names"}
                             details={"This list defines the files that shouldn't be added to the zip"}>
                    <CustomSelectMenu
                        title={"Select file names"}
                        options={dynamicConfig.blacklisted_file_names || []}
                        id={"blacklisted_file_names"}
                    />
                </SettingCard>
                <SettingCard title={"Blacklisted folder names"}
                             details={"This list defines the folders that shouldn't be added to the zip"}>
                    <CustomSelectMenu
                        title={"Select folder names"}
                        options={dynamicConfig.blacklisted_folder_names || []}
                        id={"blacklisted_folder_names"}
                    />
                </SettingCard>
                <SettingCard title={"Blacklisted file extensions"}
                             details={"This list defines the file extensions that shouldn't be added to the zip"}>
                    <CustomSelectMenu
                        title={"Select file extensions"}
                        options={dynamicConfig.blacklisted_file_extensions || []}
                        id={"blacklisted_file_extensions"}
                    />
                </SettingCard>
                <SettingCard title={"Favorited directories"}
                             details={"This list will appear in your sidebar"}>
                    <CustomSelectMenu
                        title={"Select directories"}
                        options={dynamicConfig.favorite_dirs || []}
                        id={"favorite_dirs"}
                    />
                </SettingCard>
                <SettingCard title={"IDEs"}
                             details={"Add or remove IDEs to context actions"}>
                    <CustomSelectMenu
                        title={"Select IDEs"}
                        options={dynamicConfig.ides || []}
                        id={"ides"}
                    >
                        <input type="text" placeholder={"IDE name"} id={"ideName"}/>
                        <input type="text" placeholder={"IDE exe path"} id={"idePath"}/>
                        <button onClick={() => {
                            const name = document.getElementById("ideName").value;
                            const path = document.getElementById("idePath").value;
                            if (!name || !path) return;
                            const ide = {
                                name: name,
                                command: path,
                                icon: null,
                                color: null,
                                default: true
                            }
                            setDynamicConfig(prevState => {
                                return {
                                    ...prevState,
                                    ides: [ide, ...prevState.ides || []]
                                }
                            })
                            document.getElementById("ideName").value = "";
                            document.getElementById("idePath").value = "";
                            setChanges(true)
                        }}>Add IDE
                        </button>
                    </CustomSelectMenu>
                </SettingCard>
                <SettingsInformation/>
            </ul>
        </div>
    )

    function CustomSelectMenu({options, id, children}) {
        return (
            <div className={styles.menu}>
                {children || (
                    <input type="text" placeholder={`Add ${id.replaceAll("_", " ")}...`} id={id}
                           onKeyDown={(e) => {
                               if (e.key !== "Enter") return;
                               addValue(e);
                               e.target.value = "";
                           }}/>
                )}
                <ul className={styles.options}>
                    {options.map((option, i) => {
                        const optionName = option.name || option;
                        return (
                            <li key={i}>
                                {optionName}
                                <div className={styles.buttons}>
                                    <button id={`${optionName}|||${id}`} onClick={removeValue}><FaTimes/>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}