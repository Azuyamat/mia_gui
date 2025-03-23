"use client";

import { ReactNode, createContext, useState, useContext } from "react";

type ContextMenuContextProps = {
    content: ReactNode | null;
    isVisible: boolean;

    show: (content: ReactNode) => void;
    hide: () => void;
    toggleVisibility: () => void;
};

const ContextMenuContext = createContext<ContextMenuContextProps | undefined>(
    undefined
);

export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>(null);
    const [isVisible, setIsVisible] = useState(false);

    const show = (content: ReactNode) => {
        setContent(content);
        setIsVisible(true);
    };

    const hide = () => {
        setIsVisible(false);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <ContextMenuContext.Provider
            value={{ content, isVisible, show, hide, toggleVisibility }}
        >
            {children}
        </ContextMenuContext.Provider>
    );
};

export const useContextMenu = () => {
    const context = useContext(ContextMenuContext);

    if (!context) {
        throw new Error(
            "useContextMenu must be used within a ContextMenuProvider"
        );
    }

    return context;
};
