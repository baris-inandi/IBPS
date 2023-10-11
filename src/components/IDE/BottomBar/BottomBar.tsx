import { useAtom } from "jotai";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";

const BottomBar = () => {
  const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
    useAtom(usedDiskSpaceAtom);

  return (
    <div className="font-medium text-white border-t dark:border-black px-2 text-xs w-full bg-blue-600 dark:bg-violet-500 flex justify-between">
      <p>IBPS IDE v1.0.0 • IBPS Interpreter v2.0.0</p>
      <div className="flex items-center gap-2">
        <div
          className={`rounded-full w-48 bg-white bg-opacity-30 h-[6px] ${
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
        <p>
          {usedBytesRepr} of {availableBytesRepr} used
        </p>
      </div>
    </div>
  );
};

export default BottomBar;

