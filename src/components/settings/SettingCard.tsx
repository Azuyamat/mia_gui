import styles from "../../styles/components/Settings.module.css";
import React from "react";

export default function SettingCard({
    title,
    details,
    children,
}: {
    title: string;
    details?: string | string[];
    children: any;
}): React.ReactElement {
    return (
        <li>
            <p>{title}</p>
            {children}
            {details && (
                <div className={styles.details}>
                    {details.constructor === Array ? (
                        details.map((detail, i) => <p key={i}>{detail}</p>)
                    ) : (
                        <p>{details}</p>
                    )}
                </div>
            )}
        </li>
    );
}
