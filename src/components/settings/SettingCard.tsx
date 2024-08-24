// @ts-ignore // Weird error telling me the file is not found, when it is found
import styles from "../../styles/components/Settings.module.css";

export default function SettingCard({title, details, children}: { title: string, details?: string | string[], children: any }) {
    return (
        <li>
            <p>
                {title}
            </p>
            {children}
            {details && (
                <div className={styles.details}>
                    {details.constructor === Array ? details.map((detail, i) => <p key={i}>{detail}</p>) :
                        <p>{details}</p>}
                </div>
            )}
        </li>
    )
}