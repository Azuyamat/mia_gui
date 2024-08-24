import {useContext, useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import "./styles/App.css";
import Nav from "./components/Nav.jsx";
import FileExplorer from "./components/fileExplorer/FileExplorer.jsx";
import Settings from "./components/settings/Settings.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SelectedLayout from "./components/layouts/SelectedLayout.jsx";
import {ConfigContext} from "./contexts/ConfigContext.jsx";

function App() {
    const [dir, setDir] = useState();
    const [path, setPath] = useState();
    const [selected, setSelected] = useState("files");

    async function getDir(path) {
        setDir(await invoke("get_dir", {path}));
        setPath(path);
    }

    const {config, reloadConfig} = useContext(ConfigContext);
    const [changes, setChanges] = useState(false);

    useEffect(() => {
        if (!dir && config.default_dir != null) getDir(config.default_dir);
        if (changes) reloadConfig();
        setChanges(false)
    }, [changes, config]);

    return (
        <div className={"wrapper"}>
            <Nav onSubmit={getDir} path={path}/>
            <div className={"container"}>
                <Sidebar selected={selected} setSelected={setSelected} getDir={getDir} currentPath={path}/>
                <SelectedLayout>
                    {selected === "files" && <FileExplorer dir={dir} path={path} setDir={getDir}/>}
                    {selected === "settings" && <Settings callChanges={() => {
                        setChanges(true)
                    }}/>}
                </SelectedLayout>
            </div>
        </div>
    );
}

export default App;
