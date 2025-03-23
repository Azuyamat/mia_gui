import React from "react";
import styles from "@/styles/components/form/Form.module.css";

export default function Errors({
    errors,
}: {
    errors: string[];
}): React.ReactElement | null {
    if (errors.length === 0) {
        return null;
    }

    return (
        <ul className={styles.errors}>
            {errors.map((error) => (
                <li key={error}>{error}</li>
            ))}
        </ul>
    );
}
