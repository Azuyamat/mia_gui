import styles from "../styles/components/Nav.module.css"
import {FaCog, FaPaperPlane, FaSearch} from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import {FaFileZipper} from "react-icons/fa6";
import {invoke} from "@tauri-apps/api/tauri";
import {ToastContext} from "../contexts/ToastContext.jsx";

export default function Nav({onSubmit, path}) {
    const {showToast} = useContext(ToastContext)

    function handleInput() {
        const text = document.getElementById("query").value;
        if (text.trim().length < 1) return;
        onSubmit(text);
    }

    function zip() {
        if (!path) return;
        showToast(`Zipping ${path}...`, "info")
        try {
            invoke("zip_dir", {path: path}).then(res => console.log(res));
        } catch (e) {
            showToast(`Failed to zip ${path}`, "error")
        } finally {
            showToast(`Zipped ${path}`, "success")
        }
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
            <button className={styles.icon} onClick={zip}><FaFileZipper/></button>
        </nav>
    )
}