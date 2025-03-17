import React, { createContext, useEffect } from "react";
import styles from "../styles/components/Toast.module.css";
import { Toast } from "@/domain/types/Toast";
import { ToastType } from "@/domain/enums/ToastType";

type WithCreation<T> = T & {
    createdAt: number;
};

export const ToastContext = createContext<{
    toasts: Toast[];
    showToast: (toast: Toast) => void;
}>({
    toasts: [],
    showToast: () => {},
});

export default function ToastContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] = React.useState<WithCreation<Toast>[]>([]);

    const showToast = (toast: Toast) => {
        const newToast = { ...toast, createdAt: Date.now() };
        setToasts((prev) => [...prev, newToast]);
    };

    const cleanToasts = () => {
        setToasts((prev) =>
            prev.filter((toast) => {
                return Date.now() - toast.createdAt < toast.lifetime;
            })
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            cleanToasts();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, showToast }}>
            {children}
            <div className={styles.toasts}>
                {toasts.map((toast, index) => (
                    <div
                        key={index}
                        className={`${styles.toast} ${
                            toast.type === ToastType.SUCCESS
                                ? styles.success
                                : toast.type === ToastType.ERROR
                                  ? styles.error
                                  : ""
                        }`}
                    >
                        <p>{toast.content}</p>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
