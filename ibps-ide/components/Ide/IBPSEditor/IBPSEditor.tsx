import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import { useAtom } from "jotai";
import AceEditor from "react-ace";
import { codeFontSizeAtom, ibpsCodeAtom, ideThemeAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { usePreferredOrForcedColorScheme } from "../../../hooks/usePreferredOrForcedColorScheme";
import Docs from "./Docs/Docs";
import Welcome from "./Welcome";

const IBPSEditor = () => {
  const { setFileContent, isWelcomePage } = useFiles();
  const { activeFile } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const [codeFontSize] = useAtom(codeFontSizeAtom);
  const [ideTheme] = useAtom(ideThemeAtom);

  const { colorScheme } = usePreferredOrForcedColorScheme();

  const getTheme = () =>
    ({
      // dark themes
      "theme-dark-onedark": "one_dark",
      "theme-dark-cobalt": "cobalt",
      "theme-dark-monokai": "monokai",
      "theme-dark-earth": "idle_fingers",
      "theme-dark-githubdefault": "github_dark",
      "theme-dark-githubdimmed": "github_dark",
      "theme-dark-nord": "nord_dark",
      // light themes
      "theme-light-solarized": "solarized_light",
      "theme-light-ruby": "katzenmilch",
    })[colorScheme === "dark" ? ideTheme.dark : ideTheme.light] ??
    (colorScheme === "dark" ? "dracula" : "cloud_editor"); // default editor themes

  return (
    <div className="h-full w-full" id="ibpseditor">
      <div className={activeFile === "Documentation" ? "block h-full" : "hidden"}>
        <Docs />
      </div>
      {activeFile === "Documentation" ? null : activeFile === "Welcome" ? (
        <Welcome />
      ) : (
        <AceEditor
          onLoad={(editor) => {
            editor.container.style.lineHeight = "1.45";
            editor.renderer.updateFontSize();
          }}
          className="font-mono"
          readOnly={isWelcomePage()}
          value={ibpsCode}
          mode="python"
          showPrintMargin={false}
          theme={getTheme()}
          fontSize={codeFontSize}
          onChange={(val) => {
            if (!isWelcomePage()) {
              setFileContent(activeFile, val);
            }
          }}
          name="IBPSEditor"
          height="100%"
          width="100%"
          focus={true}
        />
      )}
    </div>
  );
};

export default IBPSEditor;
