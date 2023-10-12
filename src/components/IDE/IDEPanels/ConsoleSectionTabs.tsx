import { useAtom } from "jotai";
import { SlTrash } from "react-icons/sl";
import { activeRightPanelAtom } from "../../../atoms/atoms";

const ConsoleSectionTabs = () => {
  const [activeRightPanel, setActiveRightPanel] = useAtom(
    activeRightPanelAtom,
  );

  return (
    <div className="text-xs flex w-full items-center justify-between h-full">
      <div className="flex h-full pt-[1px]">
        <button
          onClick={() => setActiveRightPanel(0)}
          className={`
          cursor-pointer border-t border-x px-3 ${
            activeRightPanel === 0
              ? "border-b-blue-600 dark:border-black border-neutral-400 dark:bg-onedark-800 bg-neutral-200 rounded-t-md"
              : "border-transparent"
          }
        `}
        >
          Ouptut
        </button>
        <button
          onClick={() => setActiveRightPanel(1)}
          className={`
        cursor-pointer border-t border-x px-3 ${
          activeRightPanel === 1
            ? "border-b-blue-600 dark:border-black border-neutral-400 dark:bg-onedark-800 bg-neutral-200 rounded-t-md"
            : "border-transparent"
        }
        `}
        >
          REPL
        </button>
        <button
          onClick={() => setActiveRightPanel(2)}
          className={`
        cursor-pointer border-t border-x px-3 ${
          activeRightPanel === 2
            ? "border-b-blue-600 dark:border-black border-neutral-400 dark:bg-onedark-800 bg-neutral-200 rounded-t-md"
            : "border-transparent"
        }
        `}
        >
          Documentation
        </button>
      </div>
      <div className="pr-1">
        <button className="flex justify-center items-center gap-2 p-1 text-red-700 dark:text-red-100 bg-red-700 dark:bg-red-600 dark:bg-opacity-20 bg-opacity-20 border border-red-700 dark:border-red-500 dark:border-opacity-20 border-opacity-20 rounded-md">
          <SlTrash />
        </button>
      </div>
    </div>
  );
};

export default ConsoleSectionTabs;
