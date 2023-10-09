import { useAtom } from "jotai";
import { IoPlaySharp } from "react-icons/io5";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { currentFileAtom } from "../../atoms/atoms";
import BottomBar from "./BottomBar/BottomBar";
import IBPSEditor from "./IBPSEditor/IBPSEditor";
import FilesPanel from "./IDEPanels/FilesPanel";
import IDEPanelTopbar from "./IDEPanels/IDEPanelTopbar";

const IDE = () => {
  const [currentFile] = useAtom(currentFileAtom);

  return (
    <div className="flex flex-col h-full w-full">
      <PanelGroup
        autoSaveId="IBPS_IDE_LAYOUT_SAVE"
        direction="horizontal"
        className="flex-grow"
      >
        <Panel minSize={16} maxSize={22} defaultSize={16}>
          <IDEPanelTopbar pl>{currentFile}</IDEPanelTopbar>
          <FilesPanel></FilesPanel>
        </Panel>
        <PanelResizeHandle className="w-5 bg-neutral-100 dark:bg-onedark-950">
          <IDEPanelTopbar />
          <div className="w-full h-7 border-r bg-onedark-800 border-neutral-400 dark:border-black"></div>
          <div className="h-full w-full border-r border-neutral-400 dark:border-black"></div>
        </PanelResizeHandle>
        <Panel>
          <div className="flex flex-col w-full h-full">
            <IDEPanelTopbar pl pr>
              Saved file on disk
              <button className="flex items-center gap-2 px-3 py-[2px] text-emerald-100 bg-emerald-600 bg-opacity-20 border border-emerald-500 border-opacity-50 rounded-md">
                <IoPlaySharp className="inline" />
                Run Code
              </button>
            </IDEPanelTopbar>
            <IBPSEditor />
          </div>
        </Panel>
        <PanelResizeHandle className="w-5 bg-neutral-100 dark:bg-onedark-950">
          <IDEPanelTopbar />
          <div className="h-full w-full border-l border-neutral-400 dark:border-black">
            {/* This is the output section */}
          </div>
        </PanelResizeHandle>
        <Panel minSize={30} maxSize={60} defaultSize={40}>
          <IDEPanelTopbar>tabs</IDEPanelTopbar>
          <div className="h-full bg-neutral-100 dark:bg-onedark-950"></div>
        </Panel>
      </PanelGroup>
      <BottomBar />
    </div>
  );
};

export default IDE;
