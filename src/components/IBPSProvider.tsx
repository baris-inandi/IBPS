import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import React from "react";
import "../styles/fonts.css";
import "../styles/global.css";
import "../styles/markdown.css";
import "../styles/tailwind.css";

const IBPSProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    return (
        <React.StrictMode>
            <Analytics />
            <SpeedInsights />
            <main className="h-screen w-screen antialiased">
                {props.children}
            </main>
        </React.StrictMode>
    );
};

export default IBPSProvider;
