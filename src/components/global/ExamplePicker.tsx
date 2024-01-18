import { useAtom } from "jotai";
import { AiOutlineFileText } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { examplePickerShownAtom } from "../../atoms/atoms";
import exampleFiles from "../../lib/exampleFiles";

interface ExamplePickerProps {}

const ExamplePicker: React.FC<ExamplePickerProps> = () => {
    const [, setExamplePickerShown] = useAtom(examplePickerShownAtom);
    return (
        <div className="h-screen w-screen absolute top-0 left-0 z-10 bg-black bg-opacity-70">
            <div className="bg-white dark:bg-idedark-950 rounded-b-md shadow-md pb-5">
                <div className="dark:text-white flex justify-between items-center px-6 pt-8 pb-0">
                    <span className="text-xl font-medium px-4">
                        Example Scripts
                    </span>
                    <div
                        className="text-xl font-bold cursor-pointer pr-2"
                        onClick={() => setExamplePickerShown(false)}
                    >
                        <IoClose></IoClose>
                    </div>
                </div>
                <div className="flex flex-col py-5">
                    {Object.entries(exampleFiles).map(([name, data]) => (
                        <div
                            onClick={() => {
                                setExamplePickerShown(false);
                            }}
                            className="flex items-center justify-between cursor-pointer hover:dark:bg-idedark-800 px-10 py-1 text-stone-800 dark:text-idedark-200 hover:bg-stone-200 dark:hover:dark:bg-idedark-900"
                        >
                            <div className="text-base flex gap-2 items-center">
                                <AiOutlineFileText className="inline" />
                                {name}
                            </div>
                            <span className="opacity-60">
                                {data.description}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExamplePicker;

