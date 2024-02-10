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
import { fileExtension } from "../../../../lib/fileExtension";
import ExamplePicker from "../../../global/ExamplePicker";
import FilesPanelFileButton from "./FilesPanelFileButton";

const FilesPanel = () => {
    const { allFilenames, newFile, activeFile, filesRaw, importIBPSorIBWS } =
        useFiles();
    const [ibpsCode] = useAtom(ibpsCodeAtom);
    const [examplePickerShown, setExamplePickerShown] = useAtom(
        examplePickerShownAtom,
    );

    const onImport = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".ibps,.ibws";
        input.multiple = true;
        input.onchange = (_) => {
            let files = Array.from(input.files ?? []);
            files.forEach((file) => {
                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = (e) => {
                        let content = String(e.target?.result ?? "");
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
        <div
            className={`h-full bg-neutral-100 dark:bg-idedark-950 text-sm flex flex-col dark:text-idedark-200 text-neutral-800
                ${window.__TAURI__ ? "bg-opacity-80 dark:bg-opacity-80" : "bg-opacity-100"}
            `}
        >
            <div className="pt-2 pb-4 flex flex-col gap-1">
                <span className="pl-2 font-medium">Files</span>
                <div className="flex flex-col">
                    <FilesPanelFileButton
                        text="New File"
                        isControlled
                        forceIcon={IoAddCircleOutline}
                        onClick={() => {
                            const n =
                                prompt("Enter a name for the new file") ?? "";
                            newFile(n);
                        }}
                    ></FilesPanelFileButton>
                    <FilesPanelFileButton
                        text="Import"
                        isControlled
                        forceIcon={IoDownloadOutline}
                        onClick={onImport}
                    ></FilesPanelFileButton>
                    <FilesPanelFileButton
                        text="Export File"
                        isControlled
                        forceIcon={IoShareOutline}
                        onClick={() => {
                            download(fileExtension(activeFile), ibpsCode);
                        }}
                    ></FilesPanelFileButton>
                    <FilesPanelFileButton
                        text="Export Workspace"
                        isControlled
                        forceIcon={IoArchiveOutline}
                        onClick={() => {
                            let name = prompt("Name your workspace");
                            if (name) {
                                download(
                                    `${name}.ibws`,
                                    JSON.stringify({
                                        __ibps_filetype__: "ibws",
                                        __ibws_version__: 1,
                                        content: compress(
                                            JSON.stringify(filesRaw.allFiles),
                                        ),
                                    }),
                                );
                            }
                        }}
                    ></FilesPanelFileButton>
                </div>
            </div>
            <FilesPanelFileButton text="Welcome" />
            <FilesPanelFileButton text="Documentation" />
            <FilesPanelFileButton
                text="Examples"
                onClick={() => setExamplePickerShown(true)}
            />
            {examplePickerShown && <ExamplePicker />}
            <span className="pl-2 font-medium pb-1 pt-4">Your Workspace</span>
            <div className="h-full overflow-y-scroll flex flex-col gap-1">
                <div className="h-full flex-grow">
                    {allFilenames()
                        .reverse()
                        .map((file) => (
                            <FilesPanelFileButton text={file} key={file} />
                        ))}
                    <div className="w-full h-20"></div>
                </div>
            </div>
        </div>
    );
};
export default FilesPanel;
