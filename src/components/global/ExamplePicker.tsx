import { useAtom } from "jotai";
import { IoClose, IoCloudDownloadOutline } from "react-icons/io5";
import { examplePickerShownAtom } from "../../atoms/atoms";
import useFiles from "../../hooks/useFiles";
import { codeCopyrightText } from "../../lib/codeCopyrightText";
import exampleFiles from "../../lib/exampleFiles";

interface ExamplePickerProps {}

const ExamplePicker: React.FC<ExamplePickerProps> = () => {
    const [, setExamplePickerShown] = useAtom(examplePickerShownAtom);
    const { newFile, filesRaw, setFilesRaw } = useFiles();

    return (
        <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-60">
            <div className="flex h-full w-5/6 max-w-md flex-col border-r border-neutral-200 bg-white shadow-lg dark:border-black dark:bg-idedark-950">
                <div className="flex items-start justify-between border-b border-neutral-200 bg-neutral-100 px-3 pb-4 pt-6 dark:border-black dark:bg-idedark-1000 dark:text-white">
                    <p
                        className={`px-4 text-xl ${window.__TAURI__ ? "pt-5" : ""}`}
                    >
                        <span className="font-medium">Example Scripts</span>
                        <br />
                        <span className="pb-5 pt-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
                            Download the official examples.
                        </span>
                    </p>
                    <button
                        className="cursor-pointer pr-2 text-xl font-bold"
                        onClick={() => setExamplePickerShown(false)}
                    >
                        <IoClose></IoClose>
                    </button>
                </div>
                <div className="flex h-full flex-col overflow-y-scroll pb-7">
                    <div className="h-4 w-full" />
                    {Object.entries(exampleFiles).map(([name, url]) => (
                        <button
                            key={name}
                            onClick={async () => {
                                const res = await fetch(url);
                                const realName =
                                    newFile("Example: " + name) ?? "";
                                const content = await res.text();
                                setFilesRaw({
                                    allFiles: {
                                        ...filesRaw.allFiles,
                                        [realName]:
                                            codeCopyrightText.trim() +
                                            "\n\n" +
                                            content,
                                    },
                                    active: realName,
                                });
                                setExamplePickerShown(false);
                            }}
                            className="flex cursor-pointer items-center justify-between px-10 py-1 text-neutral-800 hover:bg-neutral-200 dark:text-idedark-200 dark:hover:dark:bg-idedark-900 hover:dark:bg-idedark-900"
                        >
                            <div className="flex items-center gap-2 text-base">
                                <IoCloudDownloadOutline className="inline" />
                                {name}
                            </div>
                            {/* <span className="opacity-60">
                                {data.description}
                            </span> */}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExamplePicker;
