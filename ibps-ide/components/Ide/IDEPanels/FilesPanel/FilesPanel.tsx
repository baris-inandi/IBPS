import { dialog, fs } from "@tauri-apps/api";
import { useAtom } from "jotai";
import { compress } from "lz-string";
import {
  IoAddCircleOutline,
  IoArchiveOutline,
  IoDownloadOutline,
  IoShareOutline,
} from "react-icons/io5";
import { examplePickerShownAtom, ibpsCodeAtom } from "../../../../atoms/atoms";
import useFiles from "../../../../hooks/useFiles";
import { useIsTauriMacOS } from "../../../../hooks/useIsTauriMacOS";
import { fileExtension } from "../../../../lib/fileExtension";
import ExamplePicker from "../../global/ExamplePicker";
import FilesPanelFileButton from "./FilesPanelFileButton";

const FilesPanel = () => {
  const { allFilenames, newFile, activeFile, filesRaw, importIBPSorIBWS } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const [examplePickerShown, setExamplePickerShown] = useAtom(examplePickerShownAtom);
  const isTauriMacOS = useIsTauriMacOS();

  const onImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".ibps,.ibws";
    input.multiple = true;
    input.onchange = () => {
      const files = input.files ? [...input.files] : [];
      files.forEach((file) => {
        if (file) {
          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = (e) => {
            const content = String(e.target?.result ?? "");
            importIBPSorIBWS(file.name, content);
          };
          reader.onerror = () => {
            alert(`Cannot read file: '${file.name}'`);
          };
        }
      });
    };
    input.click();
  };

  const download = async (filename: string, content: string) => {
    if (window.__TAURI__) {
      const saveTo = await dialog.save({
        title: "Export file to...",
        defaultPath: filename.replace(/[^\w.]/g, ""),
      });
      if (saveTo) {
        await fs.writeFile(saveTo, content);
      }
      return;
    }

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
    <div
      className={`flex h-full flex-col bg-neutral-100 text-sm text-neutral-800 dark:bg-idedark-950 dark:text-idedark-200
                ${isTauriMacOS ? "bg-opacity-75 dark:bg-opacity-75" : "bg-opacity-100"}
            `}
    >
      <div className="flex flex-col pb-4 pt-3">
        <span className="pl-3 font-medium opacity-60">Files</span>
        <div className="flex flex-col">
          <FilesPanelFileButton
            text="New File"
            cannotRenameOrDelete
            forceIcon={IoAddCircleOutline}
            onClick={() => {
              const n = prompt("Enter a name for the new file") ?? "";
              newFile(n);
            }}
          ></FilesPanelFileButton>
          <FilesPanelFileButton
            text="Import"
            cannotRenameOrDelete
            forceIcon={IoDownloadOutline}
            onClick={onImport}
          ></FilesPanelFileButton>
          <FilesPanelFileButton
            text="Export File"
            cannotRenameOrDelete
            forceIcon={IoShareOutline}
            onClick={() => {
              download(fileExtension(activeFile), ibpsCode);
            }}
          ></FilesPanelFileButton>
          <FilesPanelFileButton
            text="Export Workspace"
            cannotRenameOrDelete
            forceIcon={IoArchiveOutline}
            onClick={() => {
              const ibwsFileContent = JSON.stringify({
                __ibps_filetype__: "ibws",
                __ibws_version__: 1,
                content: compress(JSON.stringify(filesRaw.allFiles)),
              });
              if (window.__TAURI__) {
                download("workspace.ibws", ibwsFileContent);
                return;
              }
              const name = prompt("Name your workspace");
              if (name) {
                download(`${name}.ibws`, ibwsFileContent);
              }
            }}
          ></FilesPanelFileButton>
        </div>
      </div>
      <FilesPanelFileButton cannotRenameOrDelete text="Welcome" />
      <FilesPanelFileButton cannotRenameOrDelete text="Documentation" />
      <FilesPanelFileButton
        cannotRenameOrDelete
        text="Examples"
        onClick={() => setExamplePickerShown(true)}
      />
      {examplePickerShown && <ExamplePicker />}
      <span className="pl-3 pt-4 font-medium opacity-60">Your Workspace</span>
      <div className="flex h-full flex-col gap-1 overflow-y-auto">
        <div className="h-full flex-grow">
          {allFilenames()
            .reverse()
            .map((file) => (
              <FilesPanelFileButton text={file} key={file} />
            ))}
          <div className="h-20 w-full"></div>
        </div>
      </div>
    </div>
  );
};
export default FilesPanel;
