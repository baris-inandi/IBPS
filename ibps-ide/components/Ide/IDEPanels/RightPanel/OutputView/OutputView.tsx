import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import { codeFontSizeAtom, outputAtom } from "../../../../../atoms/atoms";
import { useAceEditorTheme } from "../../../../../hooks/useAceEditorTheme";
import useFiles from "../../../../../hooks/useFiles";
import DocumentationNavigator from "./DocumentationNavigator";

const IBPSEditor = () => {
  const [output] = useAtom(outputAtom);
  const [codeFontSize] = useAtom(codeFontSizeAtom);
  const { activeFile } = useFiles();
  const aceEditorTheme = useAceEditorTheme();

  const aceRef = useRef(null);

  useEffect(() => {
    if (aceRef.current) {
      const editor = (aceRef.current as AceEditor).editor;
      const session = editor.getSession();
      const len = session.getLength();
      editor.gotoLine(len, 0, true);
      editor.moveCursorTo(len, 0);
    }
  }, [output]);

  return activeFile === "Documentation" ? (
    <DocumentationNavigator />
  ) : (
    <AceEditor
      ref={aceRef}
      className="font-mono"
      readOnly
      value={
        Object.keys(output)
          .map((key) => output[Number(key)])
          .join("\n") + "\n\n\n"
      }
      mode="plain_text"
      showPrintMargin={false}
      theme={aceEditorTheme}
      fontSize={codeFontSize - codeFontSize / 8}
      name="ibpsoutputview"
      height="100%"
      width="100%"
      showGutter={false}
      setOptions={{
        displayIndentGuides: false,
      }}
    />
  );
};

export default IBPSEditor;
