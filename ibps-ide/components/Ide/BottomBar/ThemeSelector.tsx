import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
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
      <div className="text-lg font-medium text-black dark:text-white">
        Select {colorScheme === "dark" ? "Dark" : "Light"} Theme
      </div>
      {colorScheme === "dark" ? (
        <div className="py-2">
          {Object.keys(ideThemes.dark).map((theme) => (
            <FilesPanelFileButton
              noPaddingX
              text={theme}
              key={theme}
              onClick={() =>
                setIdeTheme({ dark: ideThemes.dark[theme] ?? "", light: ideTheme.light })
              }
              hideIcon={ideTheme.dark !== ideThemes.dark[theme]}
              forceIcon={TiTick}
              cannotRenameOrDelete
            />
          ))}
        </div>
      ) : (
        <div className="py-2">
          {Object.keys(ideThemes.light).map((theme) => (
            <FilesPanelFileButton
              noPaddingX
              text={theme}
              key={theme}
              onClick={() =>
                setIdeTheme({ light: ideThemes.light[theme] ?? "", dark: ideTheme.dark })
              }
              hideIcon={ideTheme.light !== ideThemes.light[theme]}
              forceIcon={TiTick}
              cannotRenameOrDelete
            />
          ))}
        </div>
      )}
      <p className="pt-2 text-idelight-400 dark:text-idedark-500">
        Change your device theme to {colorScheme === "dark" ? "light" : "dark"} to select
        a {colorScheme === "dark" ? "light" : "dark"} theme.
      </p>
    </>
  );
};

export default ThemeSelector;
