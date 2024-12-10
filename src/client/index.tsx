import React, { useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ConfigProvider, { ConfigurationContext } from "./context/configurationProvider";

const root = createRoot(document.getElementById('root') || document.body);

function App() {
    return <ConfigProvider />
}




root.render(<App />);