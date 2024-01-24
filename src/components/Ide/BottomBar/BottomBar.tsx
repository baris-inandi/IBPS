import { useAtom } from "jotai";
import { BsDatabaseFill } from "react-icons/bs";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";
import { useVersion } from "../../../hooks/useVersion";

const BottomBar = () => {
    const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
        useAtom(usedDiskSpaceAtom);
    const { compilerVersion, ideVersion } = useVersion();

    return (
        <div className="border-t dark:border-black px-2 py-[2px] text-xs md:text-sm w-full bg-blue-500 border-neutral-300 dark:bg-idedark-1000 text-white dark:text-neutral-400 flex justify-between">
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
                <div className="font-mono border border-blue-300 dark:border-neutral-700 rounded-md py-[2px] font-medium text-xs px-1 leading-none h-fit w-fit">
                    {ideVersion}
                </div>{" "}
                <span className="px-1">•</span>
                <p>Compiler</p>
                <div className="font-mono border border-blue-300 dark:border-neutral-700 rounded-md py-[2px] font-medium text-xs px-1 leading-none h-fit w-fit">
                    {compilerVersion}
                </div>{" "}
            </div>
            <div className="flex items-center gap-2">
                <a
                    className="shrink-0 font-medium underline underline-offset-2"
                    href="https://github.com/baris-inandi/IBPS-IDE/issues/new"
                    target="blank"
                >
                    Bugs & Feedback
                </a>
                <span className="h-fit">
                    <BsDatabaseFill />
                </span>
                <div className="flex flex-shrink-0 items-center h-full gap-2">
                    <span>
                        {usedBytesRepr} of {availableBytesRepr} used
                    </span>
                </div>
                <div
                    className={`md:w-28 md:block hidden border rounded-full bg-black dark:bg-idedark-900 bg-opacity-20 h-[10px] ${
                        usedBytesPercentage >= 90
                            ? "border-red-300"
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
                        className="rounded-full h-full bg-white dark:bg-idedark-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
