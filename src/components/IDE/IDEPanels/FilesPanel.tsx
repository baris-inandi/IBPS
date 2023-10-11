import { AiOutlineFileAdd, AiOutlineFileText } from "react-icons/ai";
import { LiaPencilAltSolid } from "react-icons/lia";
import { PiFlower } from "react-icons/pi";
import { SlTrash } from "react-icons/sl";
import { TbPackageExport, TbPackageImport } from "react-icons/tb";
import useFiles from "../../../hooks/useFiles";
import { INITIAL_FILENAME } from "../../../lib/welcome";

const FilesPanel = () => {
  const {
    activeFile,
    allFilenames,
    newFile,
    deleteFile,
    renameFile,
    setActiveFile,
  } = useFiles();

  return (
    <div className="h-full bg-neutral-100 dark:bg-onedark-950 text-sm flex flex-col">
      <div className="pl-3 pt-3 flex flex-col gap-1 dark:text-onedark-200 text-neutral-800">
        <button
          onClick={() => {
            const n = prompt("Enter a name for the new file") ?? "";
            newFile(n);
          }}
          className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 px-2 py-1 rounded-md text-neutral-800 dark:text-onedark-200"
        >
          <AiOutlineFileAdd className="inline" />
          <span className="text-left">New File</span>
        </button>
        <button className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 px-2 py-1 rounded-md text-neutral-800 dark:text-onedark-200">
          <TbPackageImport className="inline" />
          <span className="text-left">Import File</span>
        </button>
        <button className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 px-2 py-1 rounded-md text-neutral-800 dark:text-onedark-200">
          <TbPackageExport className="inline" />
          <span className="text-left">Export This File</span>
        </button>
      </div>
      <div className="pl-3 h-full overflow-y flex flex-col gap-1">
        <span className="font-medium pb-2 pt-6">Your Files</span>
        <div className="h-full flex-grow">
          {allFilenames().map((file) => (
            <button
              key={file}
              onClick={() => {
                setActiveFile(file);
              }}
              className={`group flex items-center justify-between w-full px-2 py-1 rounded-md text-neutral-800 dark:text-onedark-200
              ${
                activeFile === file
                  ? "bg-neutral-200 dark:bg-onedark-800"
                  : "hover:bg-neutral-300 dark:hover:dark:bg-onedark-900"
              }
              `}
            >
              <div className="flex items-center gap-2">
                {file === "Welcome" ? (
                  <PiFlower className="inline"></PiFlower>
                ) : (
                  <AiOutlineFileText className="inline" />
                )}
                {file}
              </div>
              {file === INITIAL_FILENAME ? null : (
                <div className="items-center gap-2 group-hover:flex hidden">
                  <LiaPencilAltSolid
                    onClick={() => {
                      const n =
                        prompt("Enter a name for the new file") ?? "";
                      renameFile(file, n);
                    }}
                  ></LiaPencilAltSolid>
                  <SlTrash
                    onClick={() => {
                      console.log("delete file", file);

                      deleteFile(file);
                    }}
                  ></SlTrash>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilesPanel;

