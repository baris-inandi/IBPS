import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";
import Ide from "./components/Ide/Ide";
import ThemeColorChangeProvider from "./components/global/ThemeColorChangeProvider";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <React.StrictMode>
        <Analytics />
        <ThemeColorChangeProvider>
            <div id="ibpside" className="h-screen w-screen">
                <Ide />
            </div>
        </ThemeColorChangeProvider>
    </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

