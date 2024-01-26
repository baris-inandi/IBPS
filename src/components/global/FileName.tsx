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
        <div className="pr-5 h-full max-w-[50%] flex gap-2 items-center text-sm">
            {!filePanelVisible && (
                <button
                    className="pl-4 pr-3 cursor-pointer text-lg"
                    onClick={() => setFilePanelVisible(!filePanelVisible)}
                >
                    <PiSidebar />
                </button>
            )}
            <div className="flex items-center gap-2">
                <div className="shrink-0 flex items-center">
                    <FileIcon fileName={activeFile} />
                </div>
                <span className="overflow-hidden shrink">{activeFile}</span>
            </div>
        </div>
    );
};

export default FileName;

