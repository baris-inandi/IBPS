import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useIdeThemeCSSClasses } from "../hooks/useIdeThemeCSSClasses";
import { usePreferredOrForcedColorScheme } from "../hooks/usePreferredOrForcedColorScheme";
import "../styles/dark-themes.css";
import "../styles/global.css";
import "../styles/light-themes.css";
import "../styles/markdown.css";
import "../styles/tailwind.css";

const IBPSProvider: FunctionalComponent<{ children?: React.ReactNode }> = (props) => {
  const { colorScheme } = usePreferredOrForcedColorScheme();
  const themeClasses = useIdeThemeCSSClasses();

  useEffect(() => {
    const metaTag = document?.getElementById("meta-theme-color") as HTMLMetaElement;
    const topbarElement = document?.getElementsByClassName("ide-panel-topbar")[0];
    if (metaTag && topbarElement) {
      metaTag.content = getComputedStyle(topbarElement).backgroundColor;
    }
  }, [colorScheme, themeClasses]);

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <main
        className={`${colorScheme} ${themeClasses} h-screen w-screen antialiased dark:text-white`}
      >
        {props.children}
      </main>
    </>
  );
};

export default IBPSProvider;
