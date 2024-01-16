import { useAtom } from "jotai";
import { SlTrash } from "react-icons/sl";
import { outputAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";

const ConsoleSectionTabs = () => {
    const [, setOutput] = useAtom(outputAtom);
    const { activeFile } = useFiles();

    return (
        <div className="text-sm flex w-full items-center justify-between h-full">
            <p>
                {activeFile === "Documentation"
                    ? "Documentation Navigator"
                    : "Code Output"}
            </p>
            <div
                className={`pr-1 ${
                    activeFile === "Documentation" ? "hidden" : ""
                }`}
            >
                <button
                    onClick={() => setOutput({ "0": "" })}
                    className="text-sm flex items-center gap-1 px-3 py-[1px] dark:text-onedark-200 dark:bg-onedark-800 bg-stone-200 text-black rounded-md"
                >
                    <SlTrash />
                    Clear
                </button>
            </div>
        </div>
    );
};

export default ConsoleSectionTabs;
