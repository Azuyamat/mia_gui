import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/styles.css";
import ToastContainer from "./contexts/ToastContext";
import ConfigContainer from "./contexts/ConfigContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigContainer>
            <ToastContainer>
                <App />
            </ToastContainer>
        </ConfigContainer>
    </React.StrictMode>
);
