import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { FunctionalComponent } from "preact";
import { useIdeThemeCSSClasses } from "../hooks/useIdeThemeCSSClasses";
import { usePreferredOrForcedColorScheme } from "../hooks/usePreferredOrForcedColorScheme";
import "../styles/dark-themes.css";
import "../styles/fonts.css";
import "../styles/global.css";
import "../styles/light-themes.css";
import "../styles/markdown.css";
import "../styles/tailwind.css";

const IBPSProvider: FunctionalComponent<{ children?: React.ReactNode }> = (props) => {
  const { colorScheme } = usePreferredOrForcedColorScheme();
  const colorSchemeClasses = useIdeThemeCSSClasses();

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <main
        className={`${colorScheme} ${colorSchemeClasses} h-screen w-screen antialiased dark:text-white`}
      >
        {props.children}
      </main>
    </>
  );
};

export default IBPSProvider;
