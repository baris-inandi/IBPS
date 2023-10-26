import { AiOutlineFileText } from "react-icons/ai";
import useFiles from "../../hooks/useFiles";

const FileSwitchBar = () => {
  const { activeFile } = useFiles();

  return (
    <div className="pr-10 h-full w-full">
      <div className="flex items-center gap-2">
        <AiOutlineFileText />
        <span>{activeFile}</span>
      </div>
    </div>
  );
};

export default FileSwitchBar;
