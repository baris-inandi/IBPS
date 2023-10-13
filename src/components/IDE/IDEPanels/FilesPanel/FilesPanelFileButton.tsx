import { AiOutlineCoffee, AiOutlineFileText } from "react-icons/ai";
import { LiaPencilAltSolid } from "react-icons/lia";
import { SlTrash } from "react-icons/sl";
import { TfiBookmark } from "react-icons/tfi";
import useFiles from "../../../../hooks/useFiles";

interface FilesPanelFileButtonProps {
  file: string;
}

const FilesPanelFileButton: React.FC<FilesPanelFileButtonProps> = (
  props,
) => {
  const { activeFile, deleteFile, renameFile, setActiveFile } =
    useFiles();

  return (
    <button
      key={props.file}
      onClick={() => {
        setActiveFile(props.file);
      }}
      className={`group flex items-center justify-between w-full px-2 py-1 text-neutral-800 dark:text-onedark-200
              ${
                activeFile === props.file
                  ? "bg-neutral-200 dark:bg-onedark-800"
                  : "hover:bg-neutral-300 dark:hover:dark:bg-onedark-900"
              }
              `}
    >
      <div className="flex items-center gap-2 pl-2">
        {props.file === "Welcome" ? (
          <AiOutlineCoffee className="inline"></AiOutlineCoffee>
        ) : props.file === "Documentation" ? (
          <TfiBookmark className="inline"></TfiBookmark>
        ) : (
          <AiOutlineFileText className="inline" />
        )}
        <p className="text-left overflow-hidden overflow-ellipsis">
          {props.file}
        </p>
      </div>
      {props.file === "Welcome" ? null : (
        <div className="items-center gap-2 group-hover:flex hidden">
          <LiaPencilAltSolid
            onClick={() => {
              const n =
                prompt(`Rename ${props.file}`, props.file) ?? "";
              renameFile(props.file, n);
            }}
          ></LiaPencilAltSolid>
          <SlTrash
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${props.file}?`,
                )
              ) {
                deleteFile(props.file);
              }
            }}
          ></SlTrash>
        </div>
      )}
    </button>
  );
};

export default FilesPanelFileButton;

