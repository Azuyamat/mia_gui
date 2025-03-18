import React from "react";
import "@/styles/styles.css";
import Sidebar from "@/components/Sidebar.tsx";
import { ContextMenuProvider } from "@/contexts/ContextMenuContext";
import ContextMenu from "@/components/ContextMenu.tsx";
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
                    <ContextMenuProvider>
                        <Sidebar />
                        <main>{children}</main>
                        <ContextMenu />
                    </ContextMenuProvider>
                </ConfigProvider>
            </body>
        </html>
    );
}
