import {createContext, useContext, useEffect, useState} from "react";
import styles from "../styles/components/Toast.module.css";


export const ToastContext = createContext({
    showToast: () => {
        console.log("Method `showToast` not initialized")
    }
});

export default function Toast({children}) {
    const [toast, setToast] = useState([]);
    const [toastId, setToastId] = useState(null);

    function showToast(message, type) {
        const currentToast = {
            message: message || "No message provided",
            type: type || "info",
            id: Math.random()
        };
        setToast(prevState => [...prevState, currentToast])
    }

    useEffect(() => {
        if (toast.length > 0 && toastId === null) {
            setToastId(toast[0].id);
            setTimeout(() => {
                setToast(prevState => prevState.slice(1));
                setToastId(null)
            }, 3000);
        }
    }, [toast]);

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <div className={styles.toast} data-style={toast[0]?.type || "hidden"}>
                {toast[0]?.message || "No message provided"}
            </div>
        </ToastContext.Provider>
    );
}