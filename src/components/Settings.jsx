import styles from "../styles/components/Settings.module.css"
import {useEffect, useState} from "react";
import {FaChevronDown, FaChevronUp, FaTimes} from "react-icons/fa";
import {invoke} from "@tauri-apps/api/tauri";

export default function Settings({isOpen}) {
    if (!isOpen) return null;

    const [config, setConfig] = useState({});

    useEffect(() => {
        if (!isOpen) return;
        async function getConfig() {
            let miaConfig = await invoke("get_config");
            console.log(miaConfig);
            setConfig(miaConfig);
        }
        getConfig();
    }, [isOpen]);

    return (
        <div className={styles.container}>
            <ul className={styles.settings}>
                <li>
                    <p>Naming convention</p>
                    <input type="text" spellCheck={false} autoComplete={"off"} placeholder={"Enter convention..."} defaultValue={config.naming}/>
                    <div className={styles.details}>
                        <p><span className={"highlight"}>:name</span> - Name given</p>
                        <p><span className={"highlight"}>:date</span> - Current date</p>
                    </div>
                </li>
                <li>
                    <p>Output directory</p>
                    <input type="text" spellCheck={false} autoComplete={"off"} placeholder={"Enter directory..."}
                           defaultValue={config.output_dir || ""}/>
                    <div className={styles.details}>
                        <p>Selected directory is used by default</p>
                    </div>
                </li>
                <li>
                    <p>Blacklisted file names</p>
                    <CustomSelectMenu
                        title={"Select file names"}
                        options={config.blacklisted_file_names || []}
                    />
                </li>
                <li>
                    <p>Blacklisted folder names</p>
                    <CustomSelectMenu
                        title={"Select folder names"}
                        options={config.blacklisted_folder_names || []}
                    />
                </li>
                <li>
                    <p>Blacklisted file extensions</p>
                    <CustomSelectMenu
                        title={"Select file extensions"}
                        options={config.blacklisted_file_extensions || []}
                    />
                </li>
            </ul>
        </div>
    )
}

function CustomSelectMenu({title, options}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.menu}>
            <button onClick={() => setIsOpen(prevState => !prevState)}>
                {title} {isOpen ? <FaChevronUp/> : <FaChevronDown/>}
            </button>
            {isOpen && (
                <>
                    <input type="text" placeholder={"Add..."}/>
                    <ul className={styles.options}>
                        {options.map((option, i) => {
                            return (
                                <li key={i}>
                                    {option}
                                    <button><FaTimes/></button>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}