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
import RightPanel from "./IDEPanels/RightPanel/RightPanel";

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
        <div>
          <IDEPanelTopbar pl>
            <h1 className="font-medium">IBPS IDE</h1>
          </IDEPanelTopbar>
          <div className="w-full h-full border-r border-neutral-400 dark:border-black">
            <FilesPanel />
          </div>
        </div>
        <Panel>
          <div className="flex flex-col w-full h-full">
            <IDEPanelTopbar>
              <p>{activeFile}</p>
              <button
                className="text-xs flex items-center gap-1 px-3 py-[3px] dark:text-blue-300 dark:bg-onedark-800 bg-blue-500 text-white rounded-md"
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
          <div className="h-full w-full border-l border-neutral-400 dark:border-black"></div>
        </PanelResizeHandle>
        <Panel minSize={30} maxSize={60} defaultSize={40}>
          <IDEPanelTopbar>
            <ConsoleSectionTabs />
          </IDEPanelTopbar>
          <RightPanel />
        </Panel>
      </PanelGroup>
      <BottomBar />
    </div>
  );
};

export default IDE;
