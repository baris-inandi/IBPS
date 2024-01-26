import { useAtom } from "jotai";
import { IoTrashOutline } from "react-icons/io5";
import { PiSidebar } from "react-icons/pi";
import { outputAtom, rightPanelVisibleAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { CONSOLE_WELCOME_MSG } from "../../../lib/welcome";

const ConsoleSectionTabs = () => {
    const [, setOutput] = useAtom(outputAtom);
    const { activeFile } = useFiles();
    const [rightPanelVisible, setRightPanelVisible] = useAtom(
        rightPanelVisibleAtom,
    );

    return (
        <div className="text-sm flex w-full items-center justify-between h-full">
            <p className="leading-3">
                {activeFile === "Documentation"
                    ? "Documentation Navigator"
                    : "Code Output"}
            </p>
            <div className="flex h-full gap-3 px-4 items-center">
                <div
                    className={
                        activeFile === "Documentation"
                            ? "hidden h-full"
                            : "h-full"
                    }
                >
                    <button
                        onClick={() => setOutput({ "0": CONSOLE_WELCOME_MSG })}
                        className="text-sm flex items-center gap-1 px-3 h-full py-[1px] dark:text-idedark-200 dark:bg-idedark-700 bg-neutral-200 text-black rounded-md"
                    >
                        <IoTrashOutline />
                        <span>Clear</span>
                    </button>
                </div>
                <button
                    className="cursor-pointer pl-1 text-lg"
                    onClick={() => setRightPanelVisible(!rightPanelVisible)}
                >
                    <div className="-scale-x-100">
                        <PiSidebar />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ConsoleSectionTabs;

