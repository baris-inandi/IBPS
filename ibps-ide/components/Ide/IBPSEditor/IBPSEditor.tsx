import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-dracula";
import { useAtom } from "jotai";
import AceEditor from "react-ace";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { codeFontSizeAtom, ibpsCodeAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import Docs from "./Docs/Docs";
import Welcome from "./Welcome";

const IBPSEditor = () => {
  const { setFileContent, isWelcomePage } = useFiles();
  const { activeFile } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const [codeFontSize] = useAtom(codeFontSizeAtom);

  const prefersColorScheme = usePrefersColorScheme();

  const getTheme = () => {
    if (prefersColorScheme === "dark") {
      return "dracula";
    }
    return "cloud_editor";
  }

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
