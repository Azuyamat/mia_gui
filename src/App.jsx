import {useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import "./styles/App.css";
import Nav from "./components/Nav.jsx";
import FileExplorer from "./components/FileExplorer.jsx";
import Settings from "./components/Settings.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
    const [dir, setDir] = useState();
    const [path, setPath] = useState();
    const [settings, setSettings] = useState(false);

    async function toggleSettings() {
        setSettings((prevState) => !prevState);
    }

    async function getDir(path) {
        setDir(await invoke("get_dir", {path}));
        setPath(path);
    }

    return (
        <>
            <Nav onSubmit={getDir} path={path} toggleSettings={toggleSettings}/>
            <div className={"container"}>
                <Sidebar/>
                <FileExplorer dir={dir} setDir={getDir}/>
            </div>
            <footer>
                <p>Made by <a href="https://azuyamat.com">Azuyamat</a></p>
                <p>More information <a href="https://azuyamat.com/post/mia">here</a></p>
            </footer>

            <Settings isOpen={settings}/>
        </>
    );
}

export default App;
