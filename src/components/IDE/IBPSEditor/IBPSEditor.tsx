import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-one_dark";
import { useAtom } from "jotai";
import AceEditor from "react-ace";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { ibpsCodeAtom } from "../../../atoms/atoms";

const IBPSEditor = () => {
  const [, setIbpsCode] = useAtom(ibpsCodeAtom);
  const prefersColorScheme = usePrefersColorScheme();

  function onChange(newValue: string) {
    console.log("change", newValue);
    setIbpsCode(newValue);
  }

  return (
    <AceEditor
      mode="plain_text"
      showPrintMargin={false}
      theme={prefersColorScheme === "dark" ? "one_dark" : "dawn"}
      fontSize={16}
      onChange={onChange}
      name="IBPSEditor"
      height="100%"
      width="100%"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default IBPSEditor;

