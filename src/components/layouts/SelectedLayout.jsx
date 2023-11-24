import styles from "../../styles/layouts/SelectedLayout.module.css"

export default function SelectedLayout({children}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}