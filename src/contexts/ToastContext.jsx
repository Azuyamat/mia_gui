import {createContext, useRef} from "react";
import styles from "../styles/components/Toast.module.css";


export const ToastContext = createContext({
    showToast: () => {
        console.log("Method `showToast` not initialized")
    }
});

export default function Toast({children}) {
    const toastRef = useRef(null);

    function showToast(message, type) {
        const rid = Math.random().toString(36).substring(7);

        if (!toastRef.current) return;
        toastRef.current.setAttribute("data-style", type);
        toastRef.current.innerHTML = message;
        toastRef.current.id = rid;
        setTimeout(() => {
            if (toastRef.current.id !== rid) return;
            toastRef.current.setAttribute("data-style", "hidden");
            toastRef.current.innerHTML = "";
        }, 3000);
    }

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <div className={styles.toast} data-style={"hidden"} ref={toastRef}>
            </div>
        </ToastContext.Provider>
    );
}