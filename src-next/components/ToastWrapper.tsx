import { ActiveToast } from "@/domain/types/Toast.ts";
import styles from "@/styles/components/ToastWrapper.module.css";
import React, { useEffect, useState } from "react";

export default function ToastWrapper({ toasts }: { toasts: ActiveToast[] }) {
    return (
        <div className={styles.toastWrapper}>
            {toasts
                .sort((a, b) => a.startTimestamp - b.startTimestamp)
                .map((toast) => (
                    <ToastBox key={toast.id} toast={toast} />
                ))}
        </div>
    );
}

// const icons: Record<ToastType, React.ReactElement> = {
//     success: <FaInfo />,
//     error: <FaInfo />,
//     info: <FaInfo />,
//     warning: <FaInfo />,
// };

function ToastBox({ toast }: { toast: ActiveToast }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(
                ((Date.now() - toast.startTimestamp) / toast.duration) * 100
            );
        }, 1);

        return () => clearInterval(interval);
    }, []);

    return (
        <div data-type={toast.type} className={styles.toast}>
            <div
                className={styles.progress}
                style={{
                    width: `${progress}%`,
                }}
            />
            <div>{toast.message}</div>
        </div>
    );
}
