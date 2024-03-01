import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { IoChevronBack, IoCloudDownloadOutline } from "react-icons/io5";
import { examplePickerShownAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { codeCopyrightText } from "../../../lib/codeCopyrightText";
import exampleFiles from "../../../lib/exampleFiles";
import FilesPanelFileButton from "../IDEPanels/FilesPanel/FilesPanelFileButton";

interface ExamplePickerProps {}

const ExamplePicker: FunctionalComponent<ExamplePickerProps> = () => {
  const [, setExamplePickerShown] = useAtom(examplePickerShownAtom);
  const { newFile, filesRaw, setFilesRaw } = useFiles();

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-7">
      <button
        onClick={() => setExamplePickerShown(false)}
        className="flex cursor-pointer items-center pl-3 pt-4 text-left font-medium underline underline-offset-2 opacity-60"
      >
        <IoChevronBack />
        <span>Back to Workspace</span>
      </button>
      <p className="pl-4 pt-2 text-base font-bold">Example Scripts</p>
      <span className="font pb-4 pl-4 opacity-60">
        Download the official example scripts.
      </span>
      <div className="flex h-full flex-col gap-1 overflow-y-auto">
        <div className="h-full flex-grow">
          {Object.keys(exampleFiles).map((name) => (
            <FilesPanelFileButton
              cannotRenameOrDelete
              forceIcon={IoCloudDownloadOutline}
              key={name}
              text={name}
              onClick={async () => {
                const res = await fetch(exampleFiles[name] as string);
                const realName = newFile("Example: " + name) ?? "";
                const content = await res.text();
                setFilesRaw({
                  allFiles: {
                    ...filesRaw.allFiles,
                    [realName]: codeCopyrightText.trim() + "\n\n" + content,
                  },
                  active: realName,
                });
                setExamplePickerShown(false);
              }}
            ></FilesPanelFileButton>
          ))}
          <div className="h-20 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ExamplePicker;
