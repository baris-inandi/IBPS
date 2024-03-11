import { dialog, fs } from "@tauri-apps/api";
import { useAtom } from "jotai";
import { compress } from "lz-string";
import { useState } from "preact/hooks";
import {
  IoAddCircleOutline,
  IoArchiveOutline,
  IoDownloadOutline,
  IoShareOutline,
} from "react-icons/io5";
import { examplePickerShownAtom, ibpsCodeAtom } from "../../../../atoms/atoms";
import useFiles from "../../../../hooks/useFiles";
import { useTauriOS } from "../../../../hooks/useTauriOS";
import { fileExtension } from "../../../../lib/fileExtension";
import ExamplePicker from "../../global/ExamplePicker";
import Modal from "../../interact/Modal";
import FilesPanelFileButton from "./FilesPanelFileButton";

const FilesPanel = () => {
  const { allFilenames, newFile, activeFile, filesRaw, importIBPSorIBWS } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const [examplePickerShown, setExamplePickerShown] = useAtom(examplePickerShownAtom);
  const platform = useTauriOS();

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

  const downloadWorkspace = (name: string) => {
    const ibwsFileContent = JSON.stringify({
      __ibps_filetype__: "ibws",
      __ibws_version__: 1,
      content: compress(JSON.stringify(filesRaw.allFiles)),
    });
    if (window.__TAURI__) {
      download("workspace.ibws", ibwsFileContent);
      return;
    }
    if (name) {
      download(`${name}.ibws`, ibwsFileContent);
    }
  };

  const [downloadWorkspaceModalVisible, setDownloadWorkspaceModalVisible] =
    useState(false);
  const [newFileModalVisible, setNewFileModalVisible] = useState(false);

  return (
    <div
      className={`flex h-full flex-col bg-idelight-100 text-sm text-idelight-800 dark:bg-idedark-950 dark:text-idedark-200
                ${platform.isMacOS ? "bg-opacity-75 dark:bg-opacity-75" : "bg-opacity-100"}`}
    >
      {examplePickerShown ? (
        <ExamplePicker />
      ) : (
        <>
          <Modal
            key={new Date().valueOf()}
            visible={downloadWorkspaceModalVisible}
            setVisible={setDownloadWorkspaceModalVisible}
            requestStringInput="Name your workspace"
            onSubmit={(name) => {
              downloadWorkspace(name);
            }}
            submitText="Export"
          >
            Exporting IBPS Workspace
          </Modal>
          <Modal
            key={new Date().valueOf()}
            visible={newFileModalVisible}
            setVisible={setNewFileModalVisible}
            requestStringInput="Name your new file"
            onSubmit={(name) => {
              newFile(name);
            }}
            submitText="Create file"
          >
            Creating new IBPS script
          </Modal>
          <div className="flex flex-col pb-4 pt-3">
            <span className="pl-3 font-medium opacity-60">Files</span>
            <div className="flex flex-col">
              <FilesPanelFileButton
                text="New File"
                cannotRenameOrDelete
                forceIcon={IoAddCircleOutline}
                onClick={() => {
                  setNewFileModalVisible(true);
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
                  setDownloadWorkspaceModalVisible(true);
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
        </>
      )}
    </div>
  );
};
export default FilesPanel;
