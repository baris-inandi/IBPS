import { AiOutlineSearch } from "react-icons/ai";
import useFiles from "../../hooks/useFiles";

const FileSwitchBar = () => {
  const { activeFile } = useFiles();

  return (
    <div className="pr-10 h-full w-full">
      <div className="flex items-center gap-2 h-full w-full max-w-sm bg-stone-200 rounded-md border border-stone-300 px-2 text-stone-600 dark:bg-onedark-800 dark:border-black dark:text-neutral-300">
        <AiOutlineSearch />
        <span>{activeFile}</span>
      </div>
    </div>
  );
};

export default FileSwitchBar;
