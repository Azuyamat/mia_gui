import {useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import "./styles/App.css";
import Nav from "./components/Nav.jsx";
import FileExplorer from "./components/FileExplorer.jsx";
import Settings from "./components/Settings.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SelectedLayout from "./components/layouts/SelectedLayout.jsx";

function App() {
    const [dir, setDir] = useState();
    const [path, setPath] = useState();
    const [selected, setSelected] = useState("files");

    async function getDir(path) {
        setDir(await invoke("get_dir", {path}));
        setPath(path);
    }

    return (
        <>
            <Nav onSubmit={getDir} path={path}/>
            <div className={"container"}>
                <Sidebar selected={selected} setSelected={setSelected}/>
                <SelectedLayout>
                    {selected === "files" && <FileExplorer dir={dir} path={path} setDir={getDir}/>}
                    {selected === "settings" && <Settings/>}
                </SelectedLayout>
            </div>
            <footer>
                <p>Made by <a href="https://azuyamat.com">Azuyamat</a></p>
                <p>More information <a href="https://azuyamat.com/post/mia">here</a></p>
            </footer>
        </>
    );
}

export default App;
