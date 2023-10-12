import { useAtom } from "jotai";
import { IoPlaySharp } from "react-icons/io5";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { ibpsCodeAtom } from "../../atoms/atoms";
import useFiles from "../../hooks/useFiles";
import ibpsToPy from "../../lib/ibpscomp-rs/ibpscomp";
import BottomBar from "./BottomBar/BottomBar";
import IBPSEditor from "./IBPSEditor/IBPSEditor";
import ConsoleSectionTabs from "./IDEPanels/ConsoleSectionTabs";
import FilesPanel from "./IDEPanels/FilesPanel/FilesPanel";
import IDEPanelTopbar from "./IDEPanels/IDEPanelTopbar";

const IDE = () => {
  const { activeFile } = useFiles();
  const [ibpsCode] = useAtom(ibpsCodeAtom);

  return (
    <div className="flex flex-col h-full w-full">
      <PanelGroup
        autoSaveId="IBPS_IDE_LAYOUT_SAVE"
        direction="horizontal"
        className="flex-grow"
      >
        <Panel minSize={18} maxSize={24} defaultSize={18}>
          <IDEPanelTopbar pl>
            <h1 className="font-medium">IBPS IDE</h1>
          </IDEPanelTopbar>
          <FilesPanel />
        </Panel>
        <PanelResizeHandle className="w-3 bg-neutral-100 dark:bg-onedark-950">
          <IDEPanelTopbar />
          <div className="h-full w-full border-r border-neutral-400 dark:border-black"></div>
        </PanelResizeHandle>
        <Panel>
          <div className="flex flex-col w-full h-full">
            <IDEPanelTopbar>
              <p>{activeFile}</p>
              <button
                className="text-xs flex items-center gap-1 px-3 py-[4px] text-white bg-blue-600 dark:text-emerald-100 dark:bg-onedark-800 rounded-md"
                onClick={() => {
                  ibpsToPy(ibpsCode).then((x) => {
                    console.log(x);
                  });
                }}
              >
                <IoPlaySharp className="inline" />
                Run
              </button>
            </IDEPanelTopbar>
            <IBPSEditor />
          </div>
        </Panel>
        <PanelResizeHandle className="w-3 bg-neutral-100 dark:bg-onedark-950">
          <IDEPanelTopbar />
          <div className="h-full w-full border-l border-neutral-400 dark:border-black">
            {/* This is the output section */}
          </div>
        </PanelResizeHandle>
        <Panel minSize={30} maxSize={60} defaultSize={40}>
          <IDEPanelTopbar>
            <ConsoleSectionTabs />
          </IDEPanelTopbar>
          <div className="h-full bg-neutral-100 dark:bg-onedark-950"></div>
        </Panel>
      </PanelGroup>
      <BottomBar />
    </div>
  );
};

export default IDE;
