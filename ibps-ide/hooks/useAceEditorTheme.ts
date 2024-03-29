import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-xcode";
import { useAtom } from "jotai";
import { ideThemeAtom } from "../atoms/atoms";
import { usePreferredOrForcedColorScheme } from "./usePreferredOrForcedColorScheme";

export const useAceEditorTheme = () => {
  const { colorScheme } = usePreferredOrForcedColorScheme();
  const [ideTheme] = useAtom(ideThemeAtom);

  return (
    {
      // dark themes
      "theme-dark-onedark": "one_dark",
      "theme-dark-cobalt": "cobalt",
      "theme-dark-monokai": "monokai",
      "theme-dark-earth": "idle_fingers",
      "theme-dark-githubdefault": "github_dark",
      "theme-dark-githubdimmed": "github_dark",
      "theme-dark-nord": "nord_dark",
      "theme-dark-solarized": "solarized_dark",
      // light themes
      "theme-light-solarized": "solarized_light",
      "theme-light-ruby": "katzenmilch",
      "theme-light-lavender": "xcode",
      "theme-light-iplastic": "iplastic",
      "theme-light-monochrome": "github",
      "theme-light-sage": "dawn",
      "theme-light-desert": "dawn",
    }[colorScheme === "dark" ? ideTheme.dark : ideTheme.light] ??
    (colorScheme === "dark" ? "dracula" : "cloud_editor")
  ); // default editor themes, used as fallback
};
