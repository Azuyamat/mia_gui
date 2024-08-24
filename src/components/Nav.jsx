import styles from "../styles/components/Nav.module.css"
import {useEffect, useRef} from "react";

export default function Nav({onSubmit, path}) {
    const input = useRef(null);

    function handleInput() {
        const text = document.getElementById("query").value;
        if (text.trim().length < 1) return;
        onSubmit(text);
    }

    useEffect(() => {
        if (path) input.current.value = path;
    }, [path])

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
                onKeyDown={e => e.key === "Enter" && handleInput()}
                onFocus={e => e.target.value = (path || "")}
                spellCheck={false}
                ref={input}
            />
        </nav>
    )
}