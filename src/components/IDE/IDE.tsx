import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import FileSwitchBar from "../global/FileSwitchBar";
import RunButton from "../global/RunButton";
import BottomBar from "./BottomBar/BottomBar";
import IBPSEditor from "./IBPSEditor/IBPSEditor";
import ConsoleSectionTabs from "./IDEPanels/ConsoleSectionTabs";
import FilesPanel from "./IDEPanels/FilesPanel/FilesPanel";
import IDEPanelTopbar from "./IDEPanels/IDEPanelTopbar";
import RightPanel from "./IDEPanels/RightPanel/RightPanel";

const IDE = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <PanelGroup
        autoSaveId="IBPS_IDE_LAYOUT_SAVE"
        direction="horizontal"
        className="flex-grow"
      >
        <div className="w-52">
          <IDEPanelTopbar pl>
            <h1 className="font-medium">IBPS IDE</h1>
          </IDEPanelTopbar>
          <div className="w-full h-full border-r border-stone-300 dark:border-black">
            <FilesPanel />
          </div>
        </div>
        <Panel>
          <div className="flex flex-col w-full h-full">
            <IDEPanelTopbar>
              <div className="flex justify-between w-full h-full py-1">
                <FileSwitchBar />
                <RunButton />
              </div>
            </IDEPanelTopbar>
            <IBPSEditor />
          </div>
        </Panel>
        <PanelResizeHandle className="w-3 bg-stone-100 dark:bg-onedark-950">
          <IDEPanelTopbar />
          <div className="h-full w-full border-l border-stone-300 dark:border-black"></div>
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
