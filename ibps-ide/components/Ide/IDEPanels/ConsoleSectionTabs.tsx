import { useAtom } from "jotai";
import { IoTrashOutline } from "react-icons/io5";
import { PiSidebar } from "react-icons/pi";
import { outputAtom, rightPanelVisibleAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { CONSOLE_WELCOME_MSG } from "../../../lib/welcome";

const ConsoleSectionTabs = () => {
  const [, setOutput] = useAtom(outputAtom);
  const { activeFile } = useFiles();
  const [rightPanelVisible, setRightPanelVisible] = useAtom(rightPanelVisibleAtom);

  return (
    <div className="flex h-full w-full items-center justify-between text-sm">
      <p className="leading-3">
        {activeFile === "Documentation" ? "Documentation Navigator" : "Code Output"}
      </p>
      <div className="flex h-full items-center gap-3 px-4">
        <div className={activeFile === "Documentation" ? "hidden h-full" : "h-full"}>
          <button
            type="button"
            onClick={() => setOutput({ "0": CONSOLE_WELCOME_MSG })}
            className="highlight flex h-full items-center gap-1 rounded-md border border-neutral-300 px-3 py-[1px] text-sm text-neutral-700 shadow-sm dark:border-idedark-700 dark:bg-idedark-700 dark:text-idedark-200"
          >
            <IoTrashOutline />
            <span>Clear</span>
          </button>
        </div>
        <button
          type="button"
          aria-label="Hide Output Pane"
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
