import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-code_lens";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-cloud_editor_dark";
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

    return (
        <div className="h-full w-full" id="ibpseditor">
            <Docs
                className={
                    activeFile === "Documentation"
                        ? "block overflow-y-scroll"
                        : "hidden"
                }
            />
            {activeFile === "Documentation" ? null : activeFile ===
              "Welcome" ? (
                <Welcome />
            ) : (
                <AceEditor
                    className="font-mono"
                    readOnly={isWelcomePage()}
                    value={ibpsCode}
                    mode="python"
                    showPrintMargin={false}
                    theme={
                        prefersColorScheme === "dark"
                            ? "cloud_editor_dark"
                            : "cloud_editor"
                    }
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
