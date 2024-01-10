import { useAtom } from "jotai";
import { codeFontSizeAtom } from "../../atoms/atoms";
import useFiles from "../../hooks/useFiles";

const MIN_FONTSIZE = 10;
const MAX_FONTSIZE = 28;

const FontSizeButton: React.FC = () => {
    const [, setCodeFontSize] = useAtom(codeFontSizeAtom);
    const { activeFile } = useFiles();

    if (activeFile === "Documentation" || activeFile === "Welcome") {
        return null;
    }

    const changeFontSize = (delta: number) => {
        setCodeFontSize((prev) => {
            const newSize = prev + delta;
            if (newSize < MIN_FONTSIZE || newSize > MAX_FONTSIZE) {
                return prev;
            }
            return newSize;
        });
    };

    return (
        <div className="flex-shrink-0 text-sm flex items-center rounded-md mr-2 dark:text-onedark-200 dark:bg-onedark-800 bg-stone-200 text-black">
            <button
                onClick={() => changeFontSize(-2)}
                className="text-[0.7rem] w-full pl-3 pr-2"
            >
                A-
            </button>
            <div className="h-3/5 w-[2px] dark:bg-onedark-500 bg-stone-500" />
            <button
                onClick={() => setCodeFontSize(16)}
                className="text-xs w-full pl-2 pr-2"
            >
                A
            </button>
            <div className="h-3/5 w-[2px] dark:bg-onedark-500 bg-stone-500" />
            <button
                onClick={() => changeFontSize(+2)}
                className="w-full pl-2 pr-3"
            >
                A+
            </button>
        </div>
    );
};

export default FontSizeButton;

