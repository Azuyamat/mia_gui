import styles from "../styles/components/Sidebar.module.css"
import {FaCog, FaCookieBite, FaHome} from "react-icons/fa";
import {FaNoteSticky} from "react-icons/fa6";

const items = {
    "files": <FaHome/>,
    "notes": <FaNoteSticky/>,
    "settings": <FaCog/>,
    "about": <FaCookieBite/>
}

export default function Sidebar({selected, setSelected}) {
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
            </ul>
        </div>
    )
}