import { useAtom } from "jotai";
import { PiSidebar } from "react-icons/pi";
import { filePanelVisibleAtom } from "../../atoms/atoms";
import useFiles from "../../hooks/useFiles";
import FileIcon from "./FileIcon";

const FileName = () => {
    const { activeFile } = useFiles();
    const [filePanelVisible, setFilePanelVisible] =
        useAtom(filePanelVisibleAtom);

    return (
        <div className="flex h-full max-w-[50%] items-center gap-2 pr-5 text-sm">
            {!filePanelVisible && (
                <button
                    type="button"
                    className="cursor-pointer pl-4 pr-3 text-lg"
                    onClick={() => setFilePanelVisible(!filePanelVisible)}
                >
                    <PiSidebar />
                </button>
            )}
            <div
                className={`flex w-full items-center gap-2 ${window.__TAURI__ && filePanelVisible ? "pl-3" : ""}`}
            >
                {!window.__TAURI__ ? (
                    <div className="flex shrink-0 items-center">
                        <FileIcon fileName={activeFile} />
                    </div>
                ) : (
                    ""
                )}
                <span className="shrink overflow-hidden truncate">
                    {window.__TAURI__ &&
                    activeFile !== "Documentation" &&
                    activeFile !== "Welcome"
                        ? "Editor"
                        : activeFile}
                </span>
            </div>
        </div>
    );
};

export default FileName;
