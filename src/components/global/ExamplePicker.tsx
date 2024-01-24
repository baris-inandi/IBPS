import { useAtom } from "jotai";
import { AiOutlineFileText } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { examplePickerShownAtom } from "../../atoms/atoms";
import useFiles from "../../hooks/useFiles";
import { codeCopyrightText } from "../../lib/codeCopyrightText";
import exampleFiles from "../../lib/exampleFiles";

interface ExamplePickerProps {}

const ExamplePicker: React.FC<ExamplePickerProps> = () => {
    const [, setExamplePickerShown] = useAtom(examplePickerShownAtom);
    const { newFile, filesRaw, setFilesRaw } = useFiles();

    return (
        <div className="h-screen w-screen absolute top-0 left-0 z-10 bg-black bg-opacity-60">
            <div className="flex flex-col bg-white dark:bg-idedark-950 shadow-lg w-5/6 max-w-screen-md h-full">
                <div className="dark:text-white flex justify-between items-start px-3 pb-4 pt-6 bg-neutral-100 border-b border-neutral-200 dark:bg-idedark-1000 dark:border-black">
                    <p className="text-xl px-4">
                        <span className="text-medium">Example Scripts</span>
                        <br />
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 pt-2 pb-5">
                            Download official examples that demonstrate features
                            of IBPS.
                        </span>
                    </p>
                    <button
                        className="text-xl font-bold cursor-pointer pr-2"
                        onClick={() => setExamplePickerShown(false)}
                    >
                        <IoClose></IoClose>
                    </button>
                </div>
                <div className="flex flex-col pb-7 overflow-y-scroll h-full">
                    <div className="h-4 w-full" />
                    {Object.entries(exampleFiles).map(([name, data]) => (
                        <button
                            key={name}
                            onClick={async () => {
                                const res = await fetch(data.url);
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
                            className="flex items-center justify-between cursor-pointer hover:dark:bg-idedark-900 px-10 py-1 text-neutral-800 dark:text-idedark-200 hover:bg-neutral-200 dark:hover:dark:bg-idedark-900"
                        >
                            <div className="text-base flex gap-2 items-center">
                                <AiOutlineFileText className="inline" />
                                {name}
                            </div>
                            <span className="opacity-60">
                                {data.description}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExamplePicker;
