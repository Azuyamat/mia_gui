import React from "react";
import "@/styles/styles.css";
import Sidebar from "@/components/Sidebar.tsx";
import ContextMenu from "@/components/ContextMenu.tsx";
import { ContextMenuProvider } from "@/contexts/ContextMenuContext.tsx";
import { ToastProvider } from "@/contexts/ToastContext.tsx";
import { ConfigProvider } from "@/contexts/ConfigContext.tsx";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <ConfigProvider>
                    <ToastProvider>
                        <ContextMenuProvider>
                            <Sidebar />
                            <main>
                                <div>{children}</div>
                            </main>
                            <ContextMenu />
                        </ContextMenuProvider>
                    </ToastProvider>
                </ConfigProvider>
            </body>
        </html>
    );
}
