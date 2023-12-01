import styles from "../styles/components/FileExplorer.module.css"
import {FaCss3, FaFolder, FaHtml5, FaJava, FaPython, FaRust} from "react-icons/fa";
import {FaC, FaFile, FaFileZipper} from "react-icons/fa6";
import {BiCode, BiLogoJavascript} from "react-icons/bi";
import {CgCPlusPlus} from "react-icons/cg";
import {SiCsharp} from "react-icons/si";
import {useContext, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import {AiFillStar} from "react-icons/ai";
import {ConfigContext} from "../contexts/ConfigContext.jsx";
import {ToastContext} from "../contexts/ToastContext.jsx";
import {splitBySlash} from "../utils/formatUtils.js";

// Language icons
const langIcons = {
    "Rust": {
        icon: <FaRust/>,
        color: "#ff964f"
    },
    "Python": {
        icon: <FaPython/>,
        color: "#9cff4b"
    },
    "JavaScript": {
        icon: <BiLogoJavascript/>,
        color: "#ffea40"
    },
    "CSS": {
        icon: <FaCss3/>,
        color: "#5582ff"
    },
    "Java": {
        icon: <FaJava/>,
        color: "#ff4d4d"
    },
    "C": {
        icon: <FaC/>,
        color: "#b43fff"
    },
    "Cpp": {
        icon: <CgCPlusPlus/>,
        color: "#3e49ff"
    },
    "CSharp": {
        icon: <SiCsharp/>,
        color: "#3370ff"
    },
    "Zip": {
        icon: <FaFileZipper/>,
        color: "#77ffa7"
    },
    "HTML": {
        icon: <FaHtml5/>,
        color: "#ff6a00"
    },
}

export default function FileExplorer({dir, setDir, path}) {
    const {config, saveConfig} = useContext(ConfigContext);
    const {showToast} = useContext(ToastContext);

    if (!dir?.exists && path?.length > 0) showToast("Directory doesn't exist", "error")
    if (!dir || !dir.exists) return (
        <div className={styles.container}>
            <div className={styles.context}>
                <div className={styles.row}>
                    <div className={styles.important} data-skeleton={"true"}></div>
                </div>
            </div>
            <ul className={styles.repository}>
                <li className={styles.directory} data-skeleton={"true"}/>
                <li className={styles.directory} data-skeleton={"true"}/>
                <li className={styles.directory} data-skeleton={"true"}/>
                <li className={styles.directory} data-skeleton={"true"}/>
                <li className={styles.directory} data-skeleton={"true"}/>
                <li className={styles.directory} data-skeleton={"true"}/>
            </ul>
        </div>
    )

    const splitPath = splitBySlash(dir.path);
    const splitPathsAnchors = splitPath.map((path, i) => {
        if (path.trim().length < 1) return null;
        return (
            <button className={styles.pathButton} key={i} onClick={() => {
                let pathToHere = splitPath.slice(0, i + 1).join("\\");
                pathToHere += "\\";
                setDir(pathToHere)
            }}>
                {path}
            </button>
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.context}>
                <div className={styles.row}>
                    <div className={styles.important}>{splitPathsAnchors}</div>
                </div>
            </div>
            <ul className={styles.repository}>
                {dir.paths.sort((a, b) => {
                    if (a.entry_type === b.entry_type) return 0;
                    if (a.entry_type === "Directory") return -1;
                    return 1;
                }).map((entry, i) => {
                    const type = entry.entry_type.toLowerCase();
                    if (type === "directory")
                        return <Directory key={i} name={entry.name} path={entry.path} blacklisted={entry.blacklisted}/>
                    return <File key={i} name={entry.name} language={entry.language?.name}
                                 blacklisted={entry.blacklisted} extension={entry.extension} path={entry.path}/>
                })}
            </ul>
        </div>
    )

    function Directory({name, path, blacklisted}) {
        const [contextMenuOpen, setContextMenuOpen] = useState(false);
        return (
            <li className={styles.directory} onContextMenu={(e) => {
                e.preventDefault();
                setContextMenuOpen(true)
            }} onClick={() => {
                if (contextMenuOpen) return;
                setDir(path)
            }} data-blacklisted={blacklisted}>
                <div className={styles.flex}>
                    <i><FaFolder/></i>
                    <p>{name}</p>
                    <p><span className={styles.path}>{path || ""}</span></p>
                </div>
                <ContextMenu open={contextMenuOpen} setOpen={setContextMenuOpen} path={path} isDir={true}/>
            </li>
        )
    }

    function File({name, language, blacklisted, extension, path}) {
        const [contextMenuOpen, setContextMenuOpen] = useState(false);
        const icon = langIcons[language] || {
            icon: <FaFile/>,
            color: "#efefef"
        };


        return (
            <li className={styles.file} style={{'--color': icon.color}} data-blacklisted={blacklisted}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setContextMenuOpen(true)
                }}>
                <div className={styles.flex}>
                    <i>{icon.icon}</i>
                    <p>{name.replace(`.${extension}`, "")}</p>
                </div>

                <p className={styles.extension}>{extension}</p>
                <ContextMenu open={contextMenuOpen} setOpen={setContextMenuOpen} path={path} isDir={false} language={language}/>
            </li>
        )
    }

    function ContextMenu({open, setOpen, path, isDir, language}) {
        if (!open) return null;
        const metadata = langIcons[language] || {
            icon: <FaFile/>,
            color: "#efefef"
        }
        return (
            <div style={{'--context-color': metadata.color}} className={styles.contextMenuFatWrapper} onClick={(e) => {
                e.preventDefault();
                setOpen(false)
            }}>
                <div className={styles.contextMenu}>
                    <h3>{metadata.icon} {path}</h3>
                    <p>Context actions for {language || "file"}</p>
                    {!isDir && (
                        <ul>
                        </ul>
                    )}
                    {isDir && (
                        <ul>
                            <li onClick={() => {
                                const newConfig = config;
                                if (newConfig.favorite_dirs?.includes(path)) {
                                    newConfig.favorite_dirs = newConfig.favorite_dirs.filter((dir) => dir !== path);
                                    saveConfig(newConfig);
                                    showToast(`Removed ${path} from favorites`, "star")
                                    return;
                                }
                                newConfig.favorite_dirs = [...newConfig.favorite_dirs || [], path];
                                saveConfig(newConfig);
                                showToast(`Added ${path} to favorites`, "star")
                            }}>
                                <AiFillStar/> {config.favorite_dirs?.includes(path) ? "Unfavorite" : "Favorite"}
                            </li>
                            <li onClick={() => {
                                invoke("zip_dir", {path}).then((res) => {
                                    showToast(`Zipped directory to ${res.output_path}`, "success")
                                    setTimeout(() => {
                                        if (res.messages) showToast("Hmm... <br>" + res.messages.join("<br>"), "error")
                                    }, 1000)
                                }).catch((err) => {
                                    showToast(`Couldn't zip directory ${err.message}`, "error")
                                })
                            }}><FaFileZipper/> Zip</li>
                            {config?.ides?.map((ide, i) => {
                                return <li key={i} onClick={() => openInIde(path, ide.command)}><BiCode/> Open
                                    with {ide.name}</li>
                            })}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

function openInIde(path, ide = "idea") {
    console.log("Opening in IDE ", ide)
    invoke("open_in_ide", {
        path: path,
        ide: ide
    }).then(res => console.log(res));
}