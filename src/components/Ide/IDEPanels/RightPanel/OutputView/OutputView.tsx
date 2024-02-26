import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { codeFontSizeAtom, outputAtom } from "../../../../../atoms/atoms";
import useFiles from "../../../../../hooks/useFiles";
import DocumentationNavigator from "./DocumentationNavigator";

const IBPSEditor = () => {
    const prefersColorScheme = usePrefersColorScheme();
    const [output] = useAtom(outputAtom);
    const [codeFontSize] = useAtom(codeFontSizeAtom);
    const { activeFile } = useFiles();

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
            theme={
                prefersColorScheme === "dark"
                    ? "tomorrow_night"
                    : "cloud_editor"
            }
            fontSize={codeFontSize - codeFontSize / 8}
            name="IBPSOutput"
            height="100%"
            width="100%"
            showGutter={false}
        />
    );
};

export default IBPSEditor;
