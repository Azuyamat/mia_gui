import styles from "../styles/components/Sidebar.module.css"
import {FaCog, FaCookieBite, FaFolder, FaHome, FaStar} from "react-icons/fa";
import {FaNoteSticky} from "react-icons/fa6";
import {useContext} from "react";
import {ConfigContext} from "../contexts/ConfigContext.jsx";

const items = {
    "files": <FaHome/>,
    "settings": <FaCog/>
}

export default function Sidebar({selected, setSelected, getDir, currentPath}) {
    const {config} = useContext(ConfigContext)

    return (
        <div className={styles.container}>
            <ul>
                {Object.keys(items).map((item) => {
                    return (
                        <li key={item} data-selected={selected === item.toLowerCase()} onClick={() => {
                            setSelected(item.toLowerCase())
                        }}>
                            {items[item]} {item}
                        </li>
                    )
                })}
                <li className={styles.divider}/>
                {config?.favorite_dirs?.map((dir) => {
                    return (
                        <li key={dir} data-selected={currentPath === dir} onClick={() => {
                            setSelected("files")
                            getDir(dir)
                        }}>
                            <FaStar/> {dir.split("\\").pop()}
                        </li>
                    )
                })}
                <li className={styles.divider}/>
                {config.default_dir && (
                    <li data-selected={currentPath === config.default_dir} onClick={() => {
                        setSelected("files")
                        getDir(config.default_dir)
                    }}><FaFolder/> {config.default_dir}</li>
                )}
                {config.output_dir && (
                    <li data-selected={currentPath === config.output_dir} onClick={() => {
                        setSelected("files")
                        getDir(config.output_dir)
                    }}><FaFolder/> {config.output_dir}</li>
                )}
            </ul>
        </div>
    )
}