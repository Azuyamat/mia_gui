import { ActiveToast, Toast } from "@/domain/types/Toast.ts";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import ToastWrapper from "@/components/ToastWrapper.tsx";

type ToastContextProps = {
    activeToasts: ActiveToast[];
    addToast: (toast: Toast) => string;
    editToast: (id: string, newToast: Toast) => void;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [activeToasts, setActiveToasts] = useState<ActiveToast[]>([]);

    const addToast = (toast: Toast) => {
        setActiveToasts((prev) => [
            ...prev,
            {
                ...toast,
                startTimestamp: Date.now(),
            },
        ]);

        return toast.id;
    };

    const editToast = (id: string, newToast: Toast) => {
        setActiveToasts((prev) =>
            prev.map((toast) => {
                if (toast.id === id) {
                    return {
                        ...newToast,
                        startTimestamp: Date.now(),
                    };
                } else {
                    return toast;
                }
            })
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveToasts((prev) =>
                prev.filter((toast) => {
                    return Date.now() - toast.startTimestamp < toast.duration;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <ToastContext.Provider value={{ activeToasts, addToast, editToast }}>
            <ToastWrapper toasts={activeToasts} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
};
