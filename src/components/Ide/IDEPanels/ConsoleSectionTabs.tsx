import { useAtom } from "jotai";
import { IoTrashOutline } from "react-icons/io5";
import { outputAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { CONSOLE_WELCOME_MSG } from "../../../lib/welcome";

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
                    onClick={() => setOutput({ "0": CONSOLE_WELCOME_MSG })}
                    className="text-sm flex items-center gap-1 px-3 py-[1px] dark:text-idedark-200 dark:bg-idedark-700 bg-neutral-200 text-black rounded-md"
                >
                    <IoTrashOutline />
                    <span>Clear</span>
                </button>
            </div>
        </div>
    );
};

export default ConsoleSectionTabs;

