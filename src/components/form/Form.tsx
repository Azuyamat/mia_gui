import React from "react";
import styles from "@/styles/components/form/Form.module.css";

export default function Form({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return <div className={styles.form}>{children}</div>;
}
