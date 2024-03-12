import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { ideThemeAtom } from "../../../atoms/atoms";
import { usePreferredOrForcedColorScheme } from "../../../hooks/usePreferredOrForcedColorScheme";
import { ideThemes } from "../../../lib/ideThemes";
import FilesPanelFileButton from "../IDEPanels/FilesPanel/FilesPanelFileButton";

const ThemeSelector: FunctionalComponent = () => {
  const [ideTheme, setIdeTheme] = useAtom(ideThemeAtom);
  const { colorScheme, colorSchemeOrAuto, setColorScheme } =
    usePreferredOrForcedColorScheme();

  return (
    <>
      <div className="flex items-center gap-3 pb-3 pl-1 text-lg font-bold text-idelight-700 dark:text-idedark-100">
        {colorScheme === "dark" ? <IoMoonOutline /> : <IoSunnyOutline />}
        Select IDE Theme
      </div>
      <p className="border-t border-idelight-300 pt-2 text-idelight-500 dark:border-idedark-700 dark:text-idedark-400">
        Choose your color scheme preference:
      </p>
      <div className="pb-2 pt-1">
        <FilesPanelFileButton
          noPaddingX
          forceIcon={TiTick}
          cannotRenameOrDelete
          hideIcon={colorSchemeOrAuto !== "auto"}
          onClick={() => setColorScheme("auto")}
          text="Based on Device Theme"
        />
        <FilesPanelFileButton
          noPaddingX
          forceIcon={TiTick}
          cannotRenameOrDelete
          hideIcon={colorSchemeOrAuto !== "dark"}
          onClick={() => setColorScheme("dark")}
          text="Always Use Dark Theme"
        />
        <FilesPanelFileButton
          noPaddingX
          forceIcon={TiTick}
          cannotRenameOrDelete
          hideIcon={colorSchemeOrAuto !== "light"}
          onClick={() => setColorScheme("light")}
          text="Always Use Light Theme"
        />
      </div>
      <p className="border-t border-idelight-300 pt-2 text-idelight-500 dark:border-idedark-700 dark:text-idedark-400">
        Choose your {colorScheme} theme:
      </p>
      {colorScheme === "dark" ? (
        <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden pb-2 pt-1">
          {Object.keys(ideThemes.dark).map((theme) => (
            <div className="flex items-center gap-3" key={theme}>
              <div className="shrink-0 grow">
                <FilesPanelFileButton
                  neverActive
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
                className={`h-5 w-5 ${ideThemes.dark[theme]} flex rotate-45 rounded-full border border-idedark-700 shadow-sm`}
              >
                <div className="h-full w-1/2 rounded-l-full bg-idedark-800"></div>
                <div className="h-full w-1/2 rounded-r-full bg-idedark-accent"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden py-2">
          {Object.keys(ideThemes.light).map((theme) => (
            <div className="flex items-center gap-3" key={theme}>
              <div className="shrink-0 grow">
                <FilesPanelFileButton
                  neverActive
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
                className={`h-5 w-5 ${ideThemes.light[theme]} flex rotate-45 rounded-full border border-idelight-300 shadow-sm`}
              >
                <div className="h-full w-1/2 rounded-l-full bg-idelight-200"></div>
                <div className="h-full w-1/2 rounded-r-full bg-idelight-accent"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ThemeSelector;
