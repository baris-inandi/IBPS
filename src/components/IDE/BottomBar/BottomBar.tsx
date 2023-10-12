import { useAtom } from "jotai";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";

const BottomBar = () => {
  const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
    useAtom(usedDiskSpaceAtom);

  return (
    <div className="font-medium text-neutral-600 border-t dark:border-black px-2 text-xs w-full bg-neutral-300 border-neutral-400 dark:bg-onedark-1000 dark:text-neutral-500 flex justify-between">
      <p>IDE v0.1.0 • ibpscomp-rs v0.1.0</p>
      <div className="flex items-center gap-2 w-64">
        <div
          className={`rounded-full w-full bg-black dark:bg-onedark-900 bg-opacity-20 h-[8px] ${
            usedBytesPercentage >= 90 ? "border border-red-200" : ""
          }`}
        >
          <div
            style={{
              width:
                usedBytesPercentage >= 100
                  ? "100%"
                  : usedBytesPercentage < 3
                  ? "8px"
                  : usedBytesPercentage + "%",
            }}
            className="rounded-full h-full bg-white border border-neutral-400 dark:bg-onedark-600 dark:border-black"
          />
        </div>
        <p className="flex-shrink-0">
          {usedBytesRepr} of {availableBytesRepr} used
        </p>
      </div>
    </div>
  );
};

export default BottomBar;
