"use client";

import React from "react";
import { ConfigProvider } from "@/contexts/ConfigContext.tsx";

export default function DynamicConfigWrapper({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return <ConfigProvider>{children}</ConfigProvider>;
}
