import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-code_lens";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-one_dark";
import { useAtom } from "jotai";
import AceEditor from "react-ace";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { outputAtom } from "../../../../../atoms/atoms";

const IBPSEditor = () => {
  const prefersColorScheme = usePrefersColorScheme();
  const [output] = useAtom(outputAtom);

  return (
    <AceEditor
      className="font-mono"
      readOnly
      value={JSON.stringify(output, null, 2)}
      mode="plain_text"
      showPrintMargin={false}
      theme={prefersColorScheme === "dark" ? "one_dark" : "crimson_editor"}
      fontSize={12}
      name="IBPSOutput"
      height="100%"
      width="100%"
      showGutter={false}
      editorProps={{
        $onDocumentChange: (x) => {
          console.log("change:", x);
        },
      }}
    />
  );
};

export default IBPSEditor;

