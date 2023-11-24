import styles from "../styles/components/Sidebar.module.css"
import {FaHome} from "react-icons/fa";
import {FaNoteSticky} from "react-icons/fa6";

export default function Sidebar() {
    return (
        <div className={styles.container}>
            <ul>
                <li>
                    <FaHome/>
                    Files
                </li>
                <li>
                    <FaNoteSticky/>
                    Notes
                </li>
            </ul>
        </div>
    )
}