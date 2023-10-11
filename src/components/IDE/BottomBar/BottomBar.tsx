import { useAtom } from "jotai";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";

const BottomBar = () => {
  const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
    useAtom(usedDiskSpaceAtom);

  return (
    <div className="font-medium text-white border-t dark:border-black px-2 text-xs w-full bg-blue-600 dark:bg-violet-500 flex justify-between">
      <p>IDE v0.1.0 • ibpscomp-rs v0.1.0</p>
      <div className="flex items-center gap-2 w-64">
        <div
          className={`rounded-full w-full bg-white bg-opacity-40 h-[6px] ${
            usedBytesPercentage >= 90 ? "border border-red-200" : ""
          }`}
        >
          <div
            style={{
              width:
                usedBytesPercentage >= 100
                  ? "100%"
                  : usedBytesPercentage < 5
                  ? "6px"
                  : usedBytesPercentage + "%",
            }}
            className="rounded-full h-full bg-white"
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
