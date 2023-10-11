import { useAtom } from "jotai";
import { SlTrash } from "react-icons/sl";
import { activeRightPanelAtom } from "../../../atoms/atoms";

const ConsoleSectionTabs = () => {
  const [activeRightPanel, setActiveRightPanel] = useAtom(
    activeRightPanelAtom,
  );

  return (
    <div className="flex w-full items-center justify-between h-full">
      <div className="flex gap-1 h-full">
        <button
          onClick={() => setActiveRightPanel(0)}
          className={`
        cursor-pointer border-b-2 px-3 pt-1 ${
          activeRightPanel === 0
            ? "border-b-blue-600 dark:border-b-orange-400"
            : "border-b-transparent"
        }
        `}
        >
          Ouptut
        </button>
        <button
          onClick={() => setActiveRightPanel(1)}
          className={`
        cursor-pointer border-b-2 px-3 pt-1 ${
          activeRightPanel === 1
            ? "border-b-blue-600 dark:border-b-orange-400"
            : "border-b-transparent"
        }
        `}
        >
          REPL
        </button>
        <button
          onClick={() => setActiveRightPanel(2)}
          className={`
        cursor-pointer border-b-2 px-3 pt-1 ${
          activeRightPanel === 2
            ? "border-b-blue-600 dark:border-b-orange-400"
            : "border-b-transparent"
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
