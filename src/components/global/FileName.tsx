import { useAtom } from "jotai";
import { AiOutlineFileText } from "react-icons/ai";
import { FiSidebar } from "react-icons/fi";
import { filePanelVisibleAtom } from "../../atoms/atoms";
import useFiles from "../../hooks/useFiles";

const FileName = () => {
    const { activeFile } = useFiles();
    const [filePanelVisible, setFilePanelVisible] =
        useAtom(filePanelVisibleAtom);

    return (
        <div className="pr-5 h-full max-w-[50%] flex gap-2 items-center text-sm">
            {!filePanelVisible && (
                <button
                    className="pl-4 pr-3 cursor-pointer"
                    onClick={() => setFilePanelVisible(!filePanelVisible)}
                >
                    <FiSidebar />
                </button>
            )}
            <div className="flex items-center gap-2">
                <div className="shrink-0">
                    <AiOutlineFileText />
                </div>
                <span className="overflow-hidden shrink">{activeFile}</span>
            </div>
        </div>
    );
};

export default FileName;

