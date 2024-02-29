import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { IoClose, IoCloudDownloadOutline } from "react-icons/io5";
import { examplePickerShownAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { useTauriOS } from "../../../hooks/useTauriOS";
import { codeCopyrightText } from "../../../lib/codeCopyrightText";
import exampleFiles from "../../../lib/exampleFiles";
import FilesPanelFileButton from "../IDEPanels/FilesPanel/FilesPanelFileButton";

interface ExamplePickerProps {}

const ExamplePicker: FunctionalComponent<ExamplePickerProps> = () => {
  const [, setExamplePickerShown] = useAtom(examplePickerShownAtom);
  const { newFile, filesRaw, setFilesRaw } = useFiles();
  const platform = useTauriOS();

  return (
    <div
      className="absolute left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-60"
      onClick={() => {
        setExamplePickerShown(false);
      }}
    >
      <div className="flex h-full w-5/6 max-w-md flex-col border-r border-neutral-200 bg-white shadow-lg dark:border-black dark:bg-idedark-950">
        <div className="flex items-start justify-between border-b border-neutral-200 bg-neutral-100 px-3 pb-4 pt-6 dark:border-black dark:bg-idedark-1000 dark:text-white">
          <p className={`px-4 text-xl ${platform.isMacOS ? "pt-5" : ""}`}>
            <span className="font-medium">Example Scripts</span>
            <br />
            <span className="pb-5 pt-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
              {window.__TAURI__ ? "Get" : "Download"} the official examples.
            </span>
          </p>
          <button
            type="button"
            className="cursor-pointer pr-2 text-xl font-bold"
            onClick={() => setExamplePickerShown(false)}
          >
            <IoClose></IoClose>
          </button>
        </div>
        <div className="flex h-full flex-col overflow-y-auto pb-7">
          <div className="h-4 w-full" />
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
        </div>
      </div>
    </div>
  );
};

export default ExamplePicker;
