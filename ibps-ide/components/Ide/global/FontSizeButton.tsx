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
    <div className="mr-3 flex h-full flex-shrink-0 items-center text-sm text-neutral-700 dark:text-idedark-200 ">
      <button
        type="button"
        onClick={() => changeFontSize(-2)}
        className="mr-[3px] h-full w-full rounded-md px-3 text-xs hover:bg-neutral-200 hover:dark:bg-idedark-700"
      >
        A
      </button>
      <div className="h-3/5 border-r border-neutral-300 dark:border-idedark-500" />
      <button
        type="button"
        onClick={() => changeFontSize(+2)}
        className="ml-[3px] h-full w-full rounded-md px-3 text-base hover:bg-neutral-200 hover:dark:bg-idedark-700"
      >
        A
      </button>
    </div>
  );
};

export default FontSizeButton;
