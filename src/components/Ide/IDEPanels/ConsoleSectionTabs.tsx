import { useAtom } from "jotai";
import { SlTrash } from "react-icons/sl";
import { outputAtom } from "../../../atoms/atoms";

const ConsoleSectionTabs = () => {
    const [, setOutput] = useAtom(outputAtom);

    return (
        <div className="text-sm flex w-full items-center justify-between h-full">
            <p>Code Output</p>
            <div className="pr-1">
                <button
                    onClick={() => setOutput({})}
                    className="text-sm flex items-center gap-1 px-3 py-[1px] dark:text-onedark-200 dark:bg-onedark-800 bg-stone-200 text-black rounded-md"
                >
                    <SlTrash />
                    Clear
                </button>
            </div>
        </div>
    );
};

export default ConsoleSectionTabs;

