import { useAtom } from "jotai";
import { BsDatabaseFill } from "react-icons/bs";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";
import { useVersion } from "../../../hooks/useVersion";

const BottomBar = () => {
    const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
        useAtom(usedDiskSpaceAtom);
    const { compilerVersion, ideVersion } = useVersion();

    return (
        <div className="text-stone-500 border-t dark:border-black px-2 py-[1px] text-sm w-full bg-stone-200 border-stone-300 dark:bg-idedark-1000 dark:text-neutral-400 flex justify-between">
            <div className="flex items-center gap-1">
                <p>
                    Created by{" "}
                    <a
                        className="underline underline-offset-2 font-medium"
                        target="blank"
                        href="https://inandioglu.com"
                    >
                        Baris
                    </a>
                </p>
                <span className="px-1">•</span>
                <p>IDE</p>
                <div className="font-mono border border-stone-400 dark:border-neutral-700 rounded-md py-[2px] font-medium text-xs px-1 leading-none h-fit w-fit">
                    {ideVersion}
                </div>{" "}
                <span className="px-1">•</span>
                <p>Compiler</p>
                <div className="font-mono border border-stone-400 dark:border-neutral-700 rounded-md py-[2px] font-medium text-xs px-1 leading-none h-fit w-fit">
                    {compilerVersion}
                </div>{" "}
            </div>
            <div className="flex items-center gap-2 w-72">
                <span className="h-fit">
                    <BsDatabaseFill />
                </span>
                <div
                    className={`border rounded-full w-full bg-stone-600 dark:bg-idedark-900 bg-opacity-20 h-[10px] ${
                        usedBytesPercentage >= 90
                            ? "border-red-200"
                            : "border-transparent dark:border-black"
                    }`}
                >
                    <div
                        style={{
                            width:
                                usedBytesPercentage >= 100
                                    ? "100%"
                                    : usedBytesPercentage < 10
                                      ? "10px"
                                      : usedBytesPercentage + "%",
                        }}
                        className="rounded-full h-full bg-white border border-stone-300 dark:bg-idedark-600 dark:border-idedark-600"
                    />
                </div>
                <div className="flex flex-shrink-0 items-center h-full gap-2">
                    <span>
                        {usedBytesRepr} of {availableBytesRepr} used
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
