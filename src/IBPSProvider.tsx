import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import React from "react";
import ThemeColorChangeProvider from "./components/global/ThemeColorChangeProvider";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/markdown.css";
import "./styles/tailwind.css";

const IBPSProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    return (
        <React.StrictMode>
            <Analytics />
            <SpeedInsights />
            <ThemeColorChangeProvider>
                <div className="h-screen w-screen">{props.children}</div>
            </ThemeColorChangeProvider>
        </React.StrictMode>
    );
};

export default IBPSProvider;
