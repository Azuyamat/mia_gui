"use client";

import React from "react";
import Updater from "@/components/Updater.tsx";
import PathLink from "@/components/PathLink.tsx";
import { useConfig } from "@/contexts/ConfigContext.tsx";
import { FaHome } from "react-icons/fa";
import About from "@/components/About.tsx";

export default function Page(): React.ReactElement {
    const { config } = useConfig();

    return (
        <div className={"container"}>
            {config.defaultDir && (
                <PathLink path={config.defaultDir}>
                    <FaHome />
                    Default directory
                </PathLink>
            )}
            <Updater />
            <About />
        </div>
    );
}
