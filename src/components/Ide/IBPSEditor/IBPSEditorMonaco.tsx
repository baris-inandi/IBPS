import Editor from "@monaco-editor/react";
import { useAtom } from "jotai";
import { codeFontSizeAtom, ibpsCodeAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import Docs from "./Docs/Docs";
import Welcome from "./Welcome";

const IBPSEditor = () => {
    const { activeFile } = useFiles();
    const { setFileContent, isWelcomePage } = useFiles();
    const [ibpsCode] = useAtom(ibpsCodeAtom);
    const [codeFontSize] = useAtom(codeFontSizeAtom);

    return (
        <div className="h-full w-full" id="ibpseditor">
            <div className={activeFile === "Documentation" ? "block h-full" : "hidden"}>
                <Docs />
            </div>
            {activeFile === "Documentation" ? null : activeFile === "Welcome" ? (
                <Welcome />
            ) : (
                <div className="h-full w-full bg-white font-mono dark:bg-idedark-1000">
                    <Editor
                        height="100%"
                        width="100%"
                        defaultLanguage="python"
                        theme="vs-dark"
                        value={ibpsCode}
                        path={activeFile}
                        loading={null}
                        options={{
                            scrollBeyondLastColumn: 7,
                            cursorWidth: 2,
                            scrollbar: {
                                horizontalScrollbarSize: 7,
                                verticalScrollbarSize: 7,
                            },
                            lineHeight: 1.67,
                            fontSize: codeFontSize,
                            fontFamily:
                                '"Jetbrains Mono", "SF Mono", "Menlo", "Cascadia Mono", "mono"',
                            minimap: {
                                renderCharacters: false,
                                maxColumn: 64,
                            },
                            padding: {
                                top: codeFontSize,
                            },
                        }}
                        onChange={(val) => {
                            if (val && !isWelcomePage()) {
                                setFileContent(activeFile, val);
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default IBPSEditor;
