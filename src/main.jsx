import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/styles.css";
import Config from "./contexts/ConfigContext.jsx";
import Toast from "./contexts/ToastContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Config>
            <Toast>
                <App />
            </Toast>
        </Config>
    </React.StrictMode>,
);
