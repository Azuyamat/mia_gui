"use client";

import React from "react";
import "@/styles/styles.css";
import Sidebar from "@/components/Sidebar.tsx";
import ContextMenu from "@/components/ContextMenu.tsx";
import dynamic from "next/dynamic";
import { ContextMenuProvider } from "@/contexts/ContextMenuContext.tsx";
import { ToastProvider } from "@/contexts/ToastContext.tsx";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const DynamicConfigProvider = dynamic(
        () => import("@/components/DynamicConfigWrapper"),
        { ssr: false }
    );

    return (
        <html>
            <body>
                <DynamicConfigProvider>
                    <ToastProvider>
                        <ContextMenuProvider>
                            <Sidebar />
                            <main>
                                <div>{children}</div>
                            </main>
                            <ContextMenu />
                        </ContextMenuProvider>
                    </ToastProvider>
                </DynamicConfigProvider>
            </body>
        </html>
    );
}
