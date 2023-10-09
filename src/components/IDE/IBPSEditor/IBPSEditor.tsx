import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-one_dark";
import { useAtom } from "jotai";
import AceEditor from "react-ace";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { ibpsCodeAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { WELCOME } from "../../../lib/welcome";

const IBPSEditor = () => {
  const { setFileContent, isWelcomePage } = useFiles();
  const { activeFile } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);

  function onChange(currentFile: string, newValue: string) {
    if (currentFile) {
      setFileContent(currentFile, newValue);
    }
  }

  const prefersColorScheme = usePrefersColorScheme();

  return (
    <AceEditor
      className="font-mono"
      readOnly={isWelcomePage()}
      wrapEnabled={isWelcomePage()}
      value={isWelcomePage() ? WELCOME : ibpsCode}
      mode="plain_text"
      showPrintMargin={false}
      theme={prefersColorScheme === "dark" ? "one_dark" : "dawn"}
      fontSize={14}
      onChange={(val) => {
        if (!isWelcomePage()) {
          onChange(activeFile, val);
        }
      }}
      name="IBPSEditor"
      height="100%"
      width="100%"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default IBPSEditor;

