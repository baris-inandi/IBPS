import { useAtom } from "jotai";
import { BsDatabaseFill } from "react-icons/bs";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";
import { useVersion } from "../../../hooks/useVersion";

const BottomBar = () => {
    const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
        useAtom(usedDiskSpaceAtom);
    const { compilerVersion, ideVersion } = useVersion();

    return (
        <div className="flex w-full justify-between border-t border-neutral-300 bg-blue-500 px-2 py-[2px] text-xs text-white lg:text-sm dark:border-black dark:bg-idedark-1100 dark:text-neutral-400">
            <div className="flex items-center gap-1">
                <p>
                    Created by{" "}
                    <a
                        className="font-medium underline underline-offset-2"
                        target="blank"
                        href="https://inandioglu.com"
                    >
                        Baris
                    </a>
                </p>
                <span className="px-1">•</span>
                <p>IDE</p>
                <div className="h-fit w-fit rounded-md border border-blue-300 px-1 py-[2px] font-mono text-xs font-medium leading-none dark:border-neutral-700">
                    {ideVersion}
                </div>{" "}
                <span className="px-1">•</span>
                <p>Compiler</p>
                <div className="h-fit w-fit rounded-md border border-blue-300 px-1 py-[2px] font-mono text-xs font-medium leading-none dark:border-neutral-700">
                    {compilerVersion}
                </div>{" "}
            </div>
            <div className="flex items-center gap-2">
                <a
                    className="shrink-0 pr-3 font-medium underline underline-offset-2"
                    href="https://github.com/baris-inandi/IBPS/issues/new"
                    target="blank"
                >
                    Bugs & Feedback
                </a>
                <span className="h-fit">
                    <BsDatabaseFill />
                </span>
                <div className="flex h-full flex-shrink-0 items-center gap-2">
                    <span>
                        {usedBytesRepr} of {availableBytesRepr} used
                    </span>
                </div>
                <div
                    className={`hidden h-[10px] rounded-full border bg-black bg-opacity-20 md:block md:w-28 dark:bg-idedark-900 ${
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
                        className="h-full rounded-full bg-white dark:bg-idedark-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
