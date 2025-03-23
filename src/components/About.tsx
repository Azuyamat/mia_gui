import React from "react";
import { FaGithub } from "react-icons/fa";

export default function About(): React.ReactNode {
    return (
        <section>
            <h4>About</h4>
            <p>
                Mia is a tool designed to ease the process of zipping projects.
                It automatically excludes files and directories that you
                enumerate in settings.
            </p>
            <a
                href="https://github.com/Azuyamat/mia_gui"
                target="_blank"
                title={"Star us on GitHub!"}
            >
                <FaGithub size={20} />
            </a>
        </section>
    );
}
