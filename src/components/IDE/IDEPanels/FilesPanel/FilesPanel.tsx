import { useAtom } from "jotai";
import { compress } from "lz-string";
import {
  AiOutlineDownload,
  AiOutlineFileAdd,
  AiOutlineFileZip,
  AiOutlineUpload,
} from "react-icons/ai";
import { ibpsCodeAtom } from "../../../../atoms/atoms";
import useFiles from "../../../../hooks/useFiles";
import { fileExtension } from "../../../../lib/fileExtension";
import FilesPanelFileButton from "./FilesPanelFileButton";

const FilesPanel = () => {
  const { allFilenames, newFile, activeFile, filesRaw } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);

  const download = (filename: string, content: string) => {
    const data = new Blob([content]);
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="h-full bg-stone-100 dark:bg-onedark-950 text-sm flex flex-col dark:text-onedark-200 text-stone-800">
      <div className="pt-2 pb-4 flex flex-col gap-1">
        <span className="pl-2 font-medium">Files</span>
        <div className="flex flex-col">
          <button
            onClick={() => {
              const n = prompt("Enter a name for the new file") ?? "";
              newFile(n);
            }}
            className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 pl-4 py-1 text-stone-800 dark:text-onedark-200 hover:bg-stone-300 dark:hover:dark:bg-onedark-900"
          >
            <AiOutlineFileAdd className="inline" />
            <span className="text-left">New File</span>
          </button>
          <button className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 pl-4 py-1 text-stone-800 dark:text-onedark-200 hover:bg-stone-300 dark:hover:dark:bg-onedark-900">
            <AiOutlineDownload className="inline" />
            <span className="text-left">Import</span>
          </button>
          <button
            onClick={() => {
              download(fileExtension(activeFile), ibpsCode);
            }}
            className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 pl-4 py-1 text-stone-800 dark:text-onedark-200 hover:bg-stone-300 dark:hover:dark:bg-onedark-900"
          >
            <AiOutlineUpload className="inline" />
            <span className="text-left">Export File</span>
          </button>
          <button
            onClick={() => {
              download(
                "workspace.ibpsworkspace",
                compress(JSON.stringify(filesRaw)),
              );
            }}
            className="flex items-center gap-2 w-full hover:dark:bg-onedark-900 pl-4 py-1 text-stone-800 dark:text-onedark-200 hover:bg-stone-300 dark:hover:dark:bg-onedark-900"
          >
            <AiOutlineFileZip className="inline" />
            <span className="text-left">Export Workspace</span>
          </button>
        </div>
      </div>
      <FilesPanelFileButton file="Welcome" />
      <FilesPanelFileButton file="Documentation" />
      <span className="pl-2 font-medium pb-1 pt-4">Your Code</span>
      <div className="h-full overflow-y-scroll flex flex-col gap-1">
        <div className="h-full flex-grow">
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
