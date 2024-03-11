import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { ideThemeAtom } from "../../../atoms/atoms";
import { ideThemes } from "../../../lib/ideThemes";
import FilesPanelFileButton from "../IDEPanels/FilesPanel/FilesPanelFileButton";

const ThemeSelector: FunctionalComponent = () => {
  const [ideTheme, setIdeTheme] = useAtom(ideThemeAtom);
  const colorScheme = usePrefersColorScheme();

  return (
    <>
      <div className="flex items-center gap-3 pl-1 text-lg font-bold text-black dark:text-white">
        {colorScheme === "dark" ? <IoMoonOutline /> : <IoSunnyOutline />}
        Select {colorScheme === "dark" ? "Dark" : "Light"} Theme
      </div>
      {colorScheme === "dark" ? (
        <div className="py-2">
          {Object.keys(ideThemes.dark).map((theme) => (
            <div className="flex items-center gap-3" key={theme}>
              <div className="shrink-0 grow">
                <FilesPanelFileButton
                  noPaddingX
                  text={theme}
                  onClick={() =>
                    setIdeTheme({
                      dark: ideThemes.dark[theme] ?? "",
                      light: ideTheme.light,
                    })
                  }
                  hideIcon={ideTheme.dark !== ideThemes.dark[theme]}
                  forceIcon={TiTick}
                  cannotRenameOrDelete
                />
              </div>
              <div
                className={`h-5 w-5 ${ideThemes.dark[theme]} flex -rotate-45 rounded-full border border-idedark-700`}
              >
                <div className="h-full w-1/2 rounded-l-full bg-idedark-700"></div>
                <div className="h-full w-1/2 rounded-r-full bg-idedark-accent"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-2">
          {Object.keys(ideThemes.light).map((theme) => (
            <div className="flex items-center gap-3" key={theme}>
              <div className="shrink-0 grow">
                <FilesPanelFileButton
                  noPaddingX
                  text={theme}
                  onClick={() =>
                    setIdeTheme({
                      light: ideThemes.light[theme] ?? "",
                      dark: ideTheme.dark,
                    })
                  }
                  hideIcon={ideTheme.light !== ideThemes.light[theme]}
                  forceIcon={TiTick}
                  cannotRenameOrDelete
                />
              </div>
              <div
                className={`h-5 w-5 ${ideThemes.light[theme]} flex rotate-45 rounded-full border border-idelight-300`}
              >
                <div className="h-full w-1/2 rounded-l-full bg-idelight-200"></div>
                <div className="h-full w-1/2 rounded-r-full bg-idelight-accent"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="pt-2 text-sm text-idelight-500 dark:text-idedark-500">
        Change your device theme to {colorScheme === "dark" ? "light" : "dark"} to select
        a {colorScheme === "dark" ? "light" : "dark"} theme.
      </p>
    </>
  );
};

export default ThemeSelector;
