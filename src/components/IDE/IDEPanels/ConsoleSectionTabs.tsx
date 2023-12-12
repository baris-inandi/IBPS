import { useAtom } from "jotai";
import { SlTrash } from "react-icons/sl";
import { activeRightPanelAtom, outputAtom } from "../../../atoms/atoms";

const ConsoleSectionTabs = () => {
  const [activeRightPanel, setActiveRightPanel] = useAtom(activeRightPanelAtom);
  const [, setOutput] = useAtom(outputAtom);

  return (
    <div className="text-xs flex w-full items-center justify-between h-full">
      <div className="flex h-full pt-[1px]">
        <button
          onClick={() => setActiveRightPanel(0)}
          className={`
          cursor-pointer border-t border-x px-3 ${
            activeRightPanel === 0
              ? "border-b-blue-600 dark:border-black border-stone-300 dark:bg-onedark-800 bg-stone-100 rounded-t-md"
              : "border-transparent"
          }
        `}
        >
          Output
        </button>
        <button
          onClick={() => setActiveRightPanel(1)}
          className={`
        cursor-pointer border-t border-x px-3 ${
          activeRightPanel === 1
            ? "border-b-blue-600 dark:border-black border-stone-300 dark:bg-onedark-800 bg-stone-100 rounded-t-md"
            : "border-transparent"
        }
        `}
        >
          REPL
        </button>
      </div>
      <div className="pr-1">
        <button
          onClick={() => setOutput({})}
          className="text-xs flex items-center gap-1 px-3 py-[3px] dark:text-onedark-200 dark:bg-onedark-800 bg-stone-200 text-black rounded-md"
        >
          <SlTrash />
          Clear
        </button>
      </div>
    </div>
  );
};

export default ConsoleSectionTabs;

