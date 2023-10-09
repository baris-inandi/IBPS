import { SlTrash } from "react-icons/sl";

const ConsoleSectionTabs = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-7 text-sm">
        <button className="cursor-pointer">Ouptut</button>
        <button className="cursor-pointer">REPL</button>
        <button className="cursor-pointer">Reference</button>
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

