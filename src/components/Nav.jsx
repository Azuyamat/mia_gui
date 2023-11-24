import styles from "../styles/components/Nav.module.css"
import {FaCog, FaPaperPlane, FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";

export default function Nav({onSubmit, path, toggleSettings}) {

    function handleInput() {
        const text = document.getElementById("query").value;
        if (text.trim().length < 1) return;
        onSubmit(text);
    }

    return (
        <nav className={styles.nav}>
            <h1>M</h1>
            <input
                id={"query"}
                type="text"
                placeholder={"Enter path..."}
                autoComplete={"off"}
                autoFocus={true}
                onBlur={handleInput}
                onFocus={e => e.target.value = (path || "")}
                spellCheck={false}
            />
            <button className={styles.icon} onClick={handleInput}><FaPaperPlane/></button>
            <button className={styles.icon} onClick={toggleSettings}><FaCog/></button>
        </nav>
    )
}