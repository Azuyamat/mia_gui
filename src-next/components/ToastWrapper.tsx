import { ActiveToast } from "@/domain/types/Toast.ts";
import styles from "@/styles/components/ToastWrapper.module.css";
import React from "react";
import { ToastType } from "@/domain/enums/ToastType.ts";
import { FaInfo } from "react-icons/fa";

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

const icons: Record<ToastType, React.ReactElement> = {
    success: <FaInfo />,
    error: <FaInfo />,
    info: <FaInfo />,
    warning: <FaInfo />,
};

function ToastBox({ toast }: { toast: ActiveToast }) {
    return (
        <div data-type={toast.type} className={styles.toast}>
            <span className={styles.icon}>{icons[toast.type]}</span>
            {toast.message}
        </div>
    );
}
