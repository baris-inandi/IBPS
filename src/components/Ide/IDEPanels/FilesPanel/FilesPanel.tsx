import { useAtom } from "jotai";
import { compress } from "lz-string";
import {
    AiOutlineDownload,
    AiOutlineFileAdd,
    AiOutlineFileZip,
    AiOutlineUpload,
} from "react-icons/ai";
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
        <div className="h-full bg-stone-100 dark:bg-idedark-950 text-sm flex flex-col dark:text-idedark-200 text-stone-800">
            <div className="pt-2 pb-4 flex flex-col gap-1">
                <span className="pl-2 font-medium">Files</span>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            const n =
                                prompt("Enter a name for the new file") ?? "";
                            newFile(n);
                        }}
                        className="flex items-center gap-2 w-full hover:dark:bg-idedark-900 pl-4 py-1 text-stone-800 dark:text-idedark-200 hover:bg-stone-300 dark:hover:dark:bg-idedark-900"
                    >
                        <AiOutlineFileAdd className="inline" />
                        <span className="text-left">New File</span>
                    </button>
                    <button
                        className="flex items-center gap-2 w-full hover:dark:bg-idedark-900 pl-4 py-1 text-stone-800 dark:text-idedark-200 hover:bg-stone-300 dark:hover:dark:bg-idedark-900"
                        onClick={onImport}
                    >
                        <AiOutlineDownload className="inline" />
                        <span className="text-left">Import</span>
                    </button>
                    <button
                        onClick={() => {
                            download(fileExtension(activeFile), ibpsCode);
                        }}
                        className="flex items-center gap-2 w-full hover:dark:bg-idedark-900 pl-4 py-1 text-stone-800 dark:text-idedark-200 hover:bg-stone-300 dark:hover:dark:bg-idedark-900"
                    >
                        <AiOutlineUpload className="inline" />
                        <span className="text-left">Export File</span>
                    </button>
                    <button
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
                        className="flex items-center gap-2 w-full hover:dark:bg-idedark-900 pl-4 py-1 text-stone-800 dark:text-idedark-200 hover:bg-stone-300 dark:hover:dark:bg-idedark-900"
                    >
                        <AiOutlineFileZip className="inline" />
                        <span className="text-left">Export Workspace</span>
                    </button>
                </div>
            </div>
            <FilesPanelFileButton file="Welcome" />
            <FilesPanelFileButton file="Documentation" />
            <FilesPanelFileButton
                file="Examples"
                onClick={() => setExamplePickerShown(true)}
            />
            {examplePickerShown && <ExamplePicker />}
            <span className="pl-2 font-medium pb-1 pt-4">Your Workspace</span>
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

