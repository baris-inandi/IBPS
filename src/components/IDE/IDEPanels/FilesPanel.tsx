import { AiOutlineFileAdd } from "react-icons/ai";

const FilesPanel = () => {
  return (
    <div className="h-full bg-neutral-100 dark:bg-onedark-950 text-xs">
      <div className="px-3 h-7 flex items-center bg-onedark-800">
        <button className="flex items-center gap-2 w-full h-full">
          <AiOutlineFileAdd className="inline" />
          New File
        </button>
      </div>
    </div>
  );
};
export default FilesPanel;

