import { useAtom } from "jotai";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TbPackageExport, TbPackageImport } from "react-icons/tb";
import { ibpsCodeAtom } from "../../../../atoms/atoms";
import useFiles from "../../../../hooks/useFiles";
import { fileExtension } from "../../../../lib/fileExtension";
import FilesPanelFileButton from "./FilesPanelFileButton";

const FilesPanel = () => {
  const { allFilenames, newFile, activeFile } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);

  const exportFile = () => {
    const data = new Blob([ibpsCode]);
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileExtension(activeFile));
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="h-full bg-neutral-100 dark:bg-onedark-950 text-sm flex flex-col dark:text-onedark-200 text-neutral-800">
      <div className="pl-3 pt-3 pb-7 flex flex-col gap-1">
        <span className="font-medium text-xs uppercase py-[2px]">
          FILES
        </span>
        <div className="flex flex-col gap-1">
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
          <button
            onClick={exportFile}
            className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 px-2 py-1 rounded-md text-neutral-800 dark:text-onedark-200"
          >
            <TbPackageExport className="inline" />
            <span className="text-left">Export File</span>
          </button>
        </div>
      </div>
      <span className="pl-3 font-medium text-xs uppercase py-[4px]">
        Your Code
      </span>
      <div className="pl-3 h-full overflow-y-scroll flex flex-col gap-1">
        <div className="h-full flex-grow">
          <FilesPanelFileButton file="Welcome" />
          {allFilenames()
            .reverse()
            .map((file) => (
              <FilesPanelFileButton file={file} key={file} />
            ))}
          <div className="w-full h-20"></div>
        </div>
      </div>
    </div>
  );
};
export default FilesPanel;
