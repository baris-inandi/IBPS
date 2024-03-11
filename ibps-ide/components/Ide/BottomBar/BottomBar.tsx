import { useAtom } from "jotai";
import { useState } from "preact/hooks";
import { BsDatabaseFill } from "react-icons/bs";
import { usedDiskSpaceAtom } from "../../../atoms/atoms";
import { useVersion } from "../../../hooks/useVersion";
import Ahref from "../global/Ahref";
import Modal from "../interact/Modal";
import ThemeSelector from "./ThemeSelector";

const BottomBar = () => {
  const [{ usedBytesRepr, availableBytesRepr, usedBytesPercentage }] =
    useAtom(usedDiskSpaceAtom);
  const { compilerVersion, ideVersion } = useVersion();
  const [themePickerVisible, setThemePickerVisible] = useState(false);

  return (
    <div className="flex w-full justify-between border-t border-neutral-300 bg-white px-2 py-[3px] text-sm text-neutral-500 dark:border-black dark:bg-idedark-1100 dark:text-neutral-400">
      <Modal
        hideDefaultButtons
        visible={themePickerVisible}
        setVisible={setThemePickerVisible}
        onSubmit={() => {}}
      >
        <ThemeSelector></ThemeSelector>
      </Modal>
      <div className="flex items-center gap-1">
        <p>
          Created by{" "}
          <Ahref
            className="font-medium underline underline-offset-2"
            target="blank"
            href="https://inandioglu.com"
          >
            Baris
          </Ahref>
        </p>
        <span className="px-1">•</span>
        <p>IDE</p>
        <div className="h-fit w-fit rounded-md border border-neutral-300 px-1 py-[2px] font-mono text-[0.8em] font-medium leading-none dark:border-neutral-700">
          {ideVersion}
        </div>{" "}
        <span className="px-1">•</span>
        <p>Compiler</p>
        <div className="h-fit w-fit rounded-md border border-neutral-300 px-1 py-[2px] font-mono text-[0.8em] font-medium leading-none dark:border-neutral-700">
          {compilerVersion}
        </div>{" "}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setThemePickerVisible(true)}
          className="shrink-0 px-2 text-xs font-medium"
        >
          Change Theme
        </button>
        <Ahref
          className="shrink-0 px-2 text-xs font-medium"
          href="https://github.com/baris-inandi/IBPS/issues/new"
          target="blank"
        >
          Bugs & Feedback
        </Ahref>
        <span className="h-fit pl-2">
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
