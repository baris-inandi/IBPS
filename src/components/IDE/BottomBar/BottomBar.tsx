import { useAtom } from "jotai";
import { BsDatabaseFill } from "react-icons/bs";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";

const BottomBar = () => {
  const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
    useAtom(usedDiskSpaceAtom);

  return (
    <div className="font-medium border-t dark:border-black px-2 text-xs w-full bg-blue-500 text-white border-stone-300 dark:bg-onedark-1000 dark:text-neutral-500 flex justify-between">
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
            className="rounded-full h-full bg-white border border-stone-300 dark:bg-onedark-600 dark:border-black"
          />
        </div>
        <div className="flex flex-shrink-0 items-center h-full gap-2">
          <span className="h-fit">
            <BsDatabaseFill />
          </span>
          <span>
            {usedBytesRepr} of {availableBytesRepr} used
          </span>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
