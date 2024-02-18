import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { FunctionalComponent } from "preact";
import "../styles/fonts.css";
import "../styles/global.css";
import "../styles/markdown.css";
import "../styles/tailwind.css";

const IBPSProvider: FunctionalComponent<{ children?: React.ReactNode }> = (
    props,
) => {
    return (
        <>
            <Analytics />
            <SpeedInsights />
            <main className="h-screen w-screen antialiased">
                {props.children}
            </main>
        </>
    );
};

export default IBPSProvider;
