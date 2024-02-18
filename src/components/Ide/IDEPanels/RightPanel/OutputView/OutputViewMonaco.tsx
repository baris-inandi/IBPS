import Editor from "@monaco-editor/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "preact/hooks";
import { codeFontSizeAtom, outputAtom } from "../../../../../atoms/atoms";
import useFiles from "../../../../../hooks/useFiles";
import DocumentationNavigator from "./DocumentationNavigator";

const IBPSEditor = () => {
    const [output] = useAtom(outputAtom);
    const [codeFontSize] = useAtom(codeFontSizeAtom);
    const { activeFile } = useFiles();
    const [fmtOutput, setFmtOutput] = useState("");
    const editorRef = useRef<any>(null);

    const computeOutputFontSize = (codeFontSize: number) => {
        return codeFontSize - codeFontSize / 8;
    };

    const [outputFontSize, setOutputFontSize] = useState(
        computeOutputFontSize(codeFontSize),
    );

    useEffect(() => {
        setOutputFontSize(computeOutputFontSize(codeFontSize));
    }, [codeFontSize, setOutputFontSize]);

    useEffect(() => {
        const out =
            Object.keys(output)
                .map((key) => output[Number(key)])
                .join("\n") + "\n\n";
        setFmtOutput(out);
        if (editorRef.current) {
            editorRef.current.setScrollTop(16777271); // A big and safe number for WebKit. See https://lists.webkit.org/pipermail/webkit-dev/2009-May/007708.html
        }
    }, [output, setFmtOutput, editorRef]);

    return activeFile === "Documentation" ? (
        <DocumentationNavigator />
    ) : (
        <div className="h-full w-full bg-white font-mono dark:bg-idedark-1000">
            <Editor
                height="100%"
                width="100%"
                defaultLanguage="plaintext"
                language="plaintext"
                theme="vs-dark"
                value={fmtOutput}
                loading={null}
                defaultPath="__IBPSOutputView__"
                onMount={(editor: any) => {
                    editorRef.current = editor;
                }}
                options={{
                    scrollBeyondLastColumn: 7,
                    readOnly: true,
                    scrollBeyondLastLine: false,
                    cursorWidth: 2,
                    scrollbar: {
                        horizontalScrollbarSize: 7,
                        verticalScrollbarSize: 7,
                    },
                    lineNumbers: "off",
                    fontSize: outputFontSize,
                    fontFamily:
                        '"Jetbrains Mono", "SF Mono", "Menlo", "Cascadia Mono", "mono"',
                    minimap: {
                        enabled: false,
                    },
                    padding: {
                        top: outputFontSize,
                    },
                }}
            />
        </div>
    );
};

export default IBPSEditor;
