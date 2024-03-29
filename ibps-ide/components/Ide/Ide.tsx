import { useAtom } from "jotai";
import { PiSidebar } from "react-icons/pi";
import { PythonProvider } from "react-py";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { filePanelVisibleAtom, rightPanelVisibleAtom } from "../../atoms/atoms";
import { useTauriOS } from "../../hooks/useTauriOS";
import DragRegion from "../DesktopDragRegion";
import BottomBar from "./BottomBar/BottomBar";
import IBPSEditor from "./IBPSEditor/IBPSEditor";
import ConsoleSectionTabs from "./IDEPanels/ConsoleSectionTabs";
import FilesPanel from "./IDEPanels/FilesPanel/FilesPanel";
import IDEPanelTopbar from "./IDEPanels/IDEPanelTopbar";
import RightPanel from "./IDEPanels/RightPanel/RightPanel";
import FileName from "./global/FileName";
import FontSizeButton from "./global/FontSizeButton";
import RunButton from "./global/RunButton";

const Ide = () => {
  const [filePanelVisible, setFilePanelVisible] = useAtom(filePanelVisibleAtom);
  const [rightPanelVisible, setRightPanelVisible] = useAtom(rightPanelVisibleAtom);
  const platform = useTauriOS();

  return (
    <PythonProvider>
      <div className="flex h-full w-full flex-col" id="ibpside">
        {platform.isMacOS ? <DragRegion /> : null}
        <PanelGroup
          autoSaveId="IBPS_IDE_LAYOUT_SAVE"
          direction="horizontal"
          className={`flex-grow ${window.__TAURI__ ? "border-t border-idelight-300 dark:border-idedark-border" : ""}`}
        >
          <div className={`w-60 ${filePanelVisible ? "block" : "hidden"}`}>
            <IDEPanelTopbar pl desktopUI={platform.isMacOS}>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Hide Files Pane"
                  className="cursor-pointer pl-1 text-lg"
                  onClick={() => setFilePanelVisible(!filePanelVisible)}
                >
                  <PiSidebar />
                </button>
                <h1 className="pt-[1px] font-bold">
                  {window.__TAURI__ ? (
                    <span className="font-normal">Files Pane</span>
                  ) : (
                    <>
                      IBPS <span className="font-normal">IDE</span>{" "}
                      <span className="text-[9px]">
                        {window.__TAURI__ === undefined &&
                        (location.hostname === "localhost" ||
                          location.hostname === "127.0.0.1")
                          ? "DEBUG MODE"
                          : ""}
                      </span>
                    </>
                  )}
                </h1>
              </div>
            </IDEPanelTopbar>
            <div className="h-full w-full border-r border-idelight-300 dark:border-idedark-border">
              <FilesPanel />
            </div>
          </div>
          <Panel className={platform.isMacOS ? "shadow-md" : ""}>
            <div className="flex h-full w-full flex-col">
              <IDEPanelTopbar>
                <div className="flex h-full w-full justify-between">
                  <FileName />
                  <div className="flex shrink-0">
                    <FontSizeButton />
                    <RunButton />
                    {!rightPanelVisible && (
                      <button
                        type="button"
                        aria-label="Show Output Pane"
                        className="ml-1 mr-4 cursor-pointer pl-1 text-lg"
                        onClick={() => setRightPanelVisible(!rightPanelVisible)}
                      >
                        <div className="-scale-x-100">
                          <PiSidebar />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </IDEPanelTopbar>
              <IBPSEditor />
            </div>
          </Panel>
          {rightPanelVisible && (
            <>
              <PanelResizeHandle className="w-3 bg-idelight-100 dark:bg-idedark-950">
                <IDEPanelTopbar />
                <div className="h-full w-full border-l border-idelight-300 dark:border-idedark-border"></div>
              </PanelResizeHandle>
              <Panel minSize={30} maxSize={60} defaultSize={40}>
                <IDEPanelTopbar>
                  <ConsoleSectionTabs />
                </IDEPanelTopbar>
                <RightPanel />
              </Panel>
            </>
          )}
        </PanelGroup>
        <BottomBar />
      </div>
      {/*
      <div
        className={`${forceView ? "flex" : "flex sm:hidden"} h-full w-full flex-col items-center justify-center gap-2 overflow-y-scroll bg-white p-7 text-center dark:bg-idedark-950`}
      >
        <p className="pt-8 text-sm font-bold">
          IBPS <span className="font-normal">IDE</span>
        </p>
        <h1 className="text-2xl font-medium">Window too small</h1>
        <p className="max-w-sm text-idelight-500 dark:text-neutral-400">
          Please resize your window or switch to a desktop device to use the IBPS IDE
        </p>
        <p className="pb-5 pt-2 text-sm text-idelight-500 dark:text-neutral-400">
          IBPS IDE <code className="pl-[2px] font-bold">{ideVersion}</code>
          {"  •  "}
          ibps-comp <code className="pl-[2px] font-bold">
            {compilerVersion}
          </code> <br /> Created by{" "}
          <Ahref
            className="font-medium underline underline-offset-2"
            target="blank"
            href="https://inandioglu.com"
          >
            Baris
          </Ahref>
        </p>
        <button
          type="button"
          onClick={() => setForceView(true)}
          className="highlight w-full rounded-md bg-blue-500 py-2 text-white"
        >
          Continue Anyway
        </button>
      </div>
      */}
    </PythonProvider>
  );
};

export default Ide;
