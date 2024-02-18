import { useAtom } from "jotai";
import { codeFontSizeAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";

const MIN_FONTSIZE = 10;
const MAX_FONTSIZE = 32;

const FontSizeButton = () => {
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
        <div className="mr-2 flex flex-shrink-0 items-center rounded-md bg-neutral-200 text-sm text-black dark:bg-idedark-700 dark:text-idedark-200">
            <button
                type="button"
                onClick={() => changeFontSize(-2)}
                className="w-full pl-3 pr-2 text-[0.65rem]"
            >
                A-
            </button>
            <div className="h-3/5 border-r border-neutral-500 dark:border-idedark-500" />
            <button
                type="button"
                onClick={() => setCodeFontSize(16)}
                className="w-full pl-2 pr-2 text-xs"
            >
                A
            </button>
            <div className="h-3/5 border-r border-neutral-500 dark:border-idedark-500" />
            <button
                type="button"
                onClick={() => changeFontSize(+2)}
                className="w-full pl-2 pr-3"
            >
                A+
            </button>
        </div>
    );
};

export default FontSizeButton;
