import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import { useAtom } from "jotai";
import AceEditor from "react-ace";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { codeFontSizeAtom, ibpsCodeAtom, ideThemeAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import Docs from "./Docs/Docs";
import Welcome from "./Welcome";

const IBPSEditor = () => {
  const { setFileContent, isWelcomePage } = useFiles();
  const { activeFile } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const [codeFontSize] = useAtom(codeFontSizeAtom);
  const [ideTheme] = useAtom(ideThemeAtom);

  const prefersColorScheme = usePrefersColorScheme();

  const getTheme = () => {
    if (prefersColorScheme === "dark") {
      if (ideTheme.dark === "theme-dark-onedark") return "one_dark";
      if (ideTheme.dark === "theme-dark-cobalt") return "cobalt";
      if (ideTheme.dark === "theme-dark-monokai") return "monokai";
      if (ideTheme.dark === "theme-dark-earth") return "idle_fingers";
      return "dracula";
    }
    if (ideTheme.light === "theme-light-solarized") return "solarized_light";
    if (ideTheme.light === "theme-light-ruby") return "katzenmilch";
    return "cloud_editor";
  };

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
