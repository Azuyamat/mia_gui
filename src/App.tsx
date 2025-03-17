import React, { useContext, useEffect, useState } from "react";
import "./styles/App.css";
import Nav from "@/components/Nav";
import FileExplorer from "./components/file-explorer/FileExplorer";
import Settings from "./components/settings/Settings";
import Sidebar from "./components/Sidebar";
import SelectedLayout from "./components/layouts/SelectedLayout";
import { ConfigContext } from "./contexts/ConfigContext";
import { DirectoryInfo } from "@/domain/types/DirectoryInfo";
import { getDir } from "@/utils/get-dir";

function App(): React.ReactElement {
    const [dir, setDir] = useState<DirectoryInfo | null>(null);
    const [path, setPath] = useState<string | null>(null);
    const [selected, setSelected] = useState("files");

    async function fetchDirectory(path: string) {
        setDir(await getDir(path));
        setPath(path);
    }

    const { config } = useContext(ConfigContext);

    useEffect(() => {
        if (!dir && config?.defaultDir != null) getDir(config.defaultDir);
    }, [config]);

    return (
        <div className={"wrapper"}>
            <Nav onSubmit={getDir} path={path} />
            <div className={"container"}>
                <Sidebar
                    selected={selected}
                    setSelected={setSelected}
                    getDir={getDir}
                    currentPath={path}
                />
                <SelectedLayout>
                    {selected === "files" && dir && path && (
                        <FileExplorer
                            dir={dir}
                            path={path}
                            setDir={fetchDirectory}
                        />
                    )}
                    {selected === "settings" && <Settings />}
                </SelectedLayout>
            </div>
        </div>
    );
}

export default App;
