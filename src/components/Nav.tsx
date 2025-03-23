import styles from "../styles/components/Nav.module.css";
import React, { useEffect, useRef } from "react";

type NavProps = {
    onSubmit: (query: string) => void;
    path: string | null;
};

export default function Nav({ onSubmit, path }: NavProps): React.ReactElement {
    const input = useRef<HTMLInputElement>(null);

    function handleInput() {
        const queryElement = document.getElementById(
            "query"
        ) as HTMLInputElement;
        if (!queryElement) return;
        const text = queryElement.value;
        if (text.trim().length < 1) return;
        onSubmit(text);
    }

    useEffect(() => {
        if (!input.current) return;
        if (path) input.current.value = path;
    }, [path]);

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
                onKeyDown={(e) => e.key === "Enter" && handleInput()}
                onFocus={(e) => (e.target.value = path || "")}
                spellCheck={false}
                ref={input}
            />
        </nav>
    );
}
