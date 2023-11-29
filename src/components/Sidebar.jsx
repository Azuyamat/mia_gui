import styles from "../styles/components/Sidebar.module.css"
import {FaCog, FaFolder, FaHome, FaStar} from "react-icons/fa";
import {useContext} from "react";
import {ConfigContext} from "../contexts/ConfigContext.jsx";
import {compareTwoPaths, getLastValidElement, splitBySlash} from "../utils/formatUtils.js";

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
                            <span>{items[item]}</span> {item}
                        </li>
                    )
                })}
                <li className={styles.divider}/>
                {currentPath && config?.favorite_dirs?.map((dir) => {
                    return (
                        <li key={dir} data-selected={compareTwoPaths(currentPath, dir)} onClick={() => {
                            setSelected("files")
                            getDir(dir)
                        }}>
                            <span><FaStar/></span> {splitBySlash(dir).pop()}
                        </li>
                    )
                })}
                <li className={styles.divider}/>
                {config.default_dir && currentPath && (
                    <li data-selected={compareTwoPaths(currentPath, config.default_dir)} onClick={() => {
                        setSelected("files")
                        getDir(config.default_dir)
                    }}><span><FaFolder/></span> {getLastValidElement(config.default_dir)}</li>
                )}
                {config.output_dir && currentPath && (
                    <li data-selected={compareTwoPaths(currentPath, config.output_dir)} onClick={() => {
                        setSelected("files")
                        getDir(config.output_dir)
                    }}><span><FaFolder/></span> {getLastValidElement(config.output_dir)}</li>
                )}
            </ul>
        </div>
    )
}