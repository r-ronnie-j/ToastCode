import React from "react";
import { createRoot } from "react-dom/client";
import ConfigProvider from "./context/configurationProvider";

const root = createRoot(document.getElementById('root') || document.body);

function App() {
    return <ConfigProvider />
}




root.render(<App />);