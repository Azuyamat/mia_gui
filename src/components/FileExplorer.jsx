import styles from "../styles/components/FileExplorer.module.css"
import {FaCss3, FaFolder, FaJava, FaPython, FaRust} from "react-icons/fa";
import {HiDotsHorizontal} from "react-icons/hi";
import {FaC, FaFile, FaFileZipper} from "react-icons/fa6";
import {BiLogoJavascript} from "react-icons/bi";
import {CgCPlusPlus} from "react-icons/cg";
import {SiCsharp} from "react-icons/si";

// Language icons
const langIcons = {
    "Rust": {
        icon: <FaRust/>,
        color: "#ffe2e2"
    },
    "Python": {
        icon: <FaPython/>,
        color: "#e0ffc7"
    },
    "JavaScript": {
        icon: <BiLogoJavascript/>,
        color: "#fffacf"
    },
    "CSS": {
        icon: <FaCss3/>,
        color: "#cce8ff"
    },
    "Java": {
        icon: <FaJava/>,
        color: "#fff4cb"
    },
    "C": {
        icon: <FaC/>,
        color: "#ffcac8"
    },
    "Cpp": {
        icon: <CgCPlusPlus/>,
        color: "#efc8ff"
    },
    "CSharp": {
        icon: <SiCsharp/>,
        color: "#ccdbff"
    },
    "Zip": {
        icon: <FaFileZipper/>,
        color: "#ffdcca"
    }
}

export default function FileExplorer({dir, setDir}) {
    console.log(dir)
    if (!dir || !dir.exists) return (
        <div className={styles.container}>
            <div className={styles.context}>
                <div className={styles.row}>
                    <div className={styles.important}></div>
                </div>
            </div>
            <ul className={styles.repository}/>
        </div>
    )

    const splitPath = dir.path.split("\\");

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
                {dir.paths.map((entry, i) => {
                    const type = entry.entry_type.toLowerCase();
                    if (type === "directory") return <Directory key={i} name={entry.name} path={entry.path}
                                                                blacklisted={entry.blacklisted}/>
                    return <File key={i} name={entry.name} language={entry.language} blacklisted={entry.blacklisted}/>
                })}
            </ul>
        </div>
    )

    function Directory({name, path, blacklisted}) {
        return (
            <li className={styles.directory} onClick={() => {
                setDir(path)
            }} data-blacklisted={blacklisted}>
                <i><FaFolder/></i>
                <p>{name}</p>
                <p><span className={styles.path}>{path || ""}</span></p>
                <button className={styles.dots}><HiDotsHorizontal/></button>
            </li>
        )
    }

    function File({name, language, blacklisted}) {
        const icon = langIcons[language] || {
            icon: <FaFile/>,
            color: "#efefef"
        };

        return (
            <li className={styles.file} style={{'--color': icon.color}} data-blacklisted={blacklisted}>
                <i>{icon.icon}</i>
                <p>{name}</p>
                <button className={styles.dots}><HiDotsHorizontal/></button>
            </li>
        )
    }
}