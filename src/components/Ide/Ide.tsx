"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import { PiSidebar } from "react-icons/pi";
import { PythonProvider } from "react-py";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { filePanelVisibleAtom, rightPanelVisibleAtom } from "../../atoms/atoms";
import { useVersion } from "../../hooks/useVersion";
import DragRegion from "../global/DragRegion";
import FileName from "../global/FileName";
import FontSizeButton from "../global/FontSizeButton";
import RunButton from "../global/RunButton";
import BottomBar from "./BottomBar/BottomBar";
import IBPSEditor from "./IBPSEditor/IBPSEditor";
import ConsoleSectionTabs from "./IDEPanels/ConsoleSectionTabs";
import FilesPanel from "./IDEPanels/FilesPanel/FilesPanel";
import IDEPanelTopbar from "./IDEPanels/IDEPanelTopbar";
import RightPanel from "./IDEPanels/RightPanel/RightPanel";

const Ide = () => {
    const { compilerVersion, ideVersion } = useVersion();
    const [filePanelVisible, setFilePanelVisible] =
        useAtom(filePanelVisibleAtom);
    const [rightPanelVisible, setRightPanelVisible] = useAtom(
        rightPanelVisibleAtom,
    );
    const [forceView, setForceView] = useState(false);
    const colorScheme = usePrefersColorScheme();

    return (
        <PythonProvider>
            <div
                className={`${forceView ? "flex" : "hidden sm:flex"} flex-col h-full w-full`}
                id="ibpside"
            >
                {window.__TAURI__ ? <DragRegion /> : null}
                <PanelGroup
                    autoSaveId="IBPS_IDE_LAYOUT_SAVE"
                    direction="horizontal"
                    className="flex-grow"
                >
                    <div
                        className={`w-56 ${
                            filePanelVisible ? "block" : "hidden"
                        }`}
                    >
                        <IDEPanelTopbar
                            pl
                            desktopUI={window.__TAURI__ ? true : false}
                        >
                            <div className="flex gap-4 items-center">
                                <button
                                    className="cursor-pointer pl-1 text-lg"
                                    onClick={() =>
                                        setFilePanelVisible(!filePanelVisible)
                                    }
                                >
                                    <PiSidebar />
                                </button>
                                <h1 className="font-bold font-logo pt-[1px]">
                                    {window.__TAURI__ ? (
                                        <span className="font-normal">
                                            Files Pane
                                        </span>
                                    ) : (
                                        <>
                                            IBPS{" "}
                                            <span className="font-normal">
                                                IDE
                                            </span>
                                        </>
                                    )}
                                </h1>
                            </div>
                        </IDEPanelTopbar>
                        <div className="w-full h-full border-r border-neutral-300 dark:border-black">
                            <FilesPanel />
                        </div>
                    </div>
                    <Panel className={window.__TAURI__ ? "shadow-md" : ""}>
                        <div className="flex flex-col w-full h-full">
                            <IDEPanelTopbar>
                                <div className="flex justify-between w-full h-full">
                                    <FileName />
                                    <div className="flex shrink-0">
                                        <FontSizeButton />
                                        <RunButton />
                                        {!rightPanelVisible && (
                                            <button
                                                className="cursor-pointer pl-1 ml-1 text-lg mr-4"
                                                onClick={() =>
                                                    setRightPanelVisible(
                                                        !rightPanelVisible,
                                                    )
                                                }
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
                            <PanelResizeHandle className="w-3 bg-neutral-100 dark:bg-idedark-950">
                                <IDEPanelTopbar />
                                <div className="h-full w-full border-l border-neutral-300 dark:border-black"></div>
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
            <div
                className={`${forceView ? "flex" : "sm:hidden flex"} overflow-y-scroll h-full w-full flex-col gap-2 bg-white dark:bg-idedark-950 p-7 items-center text-center`}
            >
                <img
                    src={`/img/window-${colorScheme === "dark" ? "dark" : "light"}.webp`}
                    alt="Screenshot of the IBPS IDE"
                />
                <p className="pt-5 font-logo text-sm font-bold">
                    IBPS <span className="font-normal">IDE</span>
                </p>
                <h1 className="font-medium text-2xl">Window too small</h1>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-sm">
                    Please resize your window or switch to a desktop device to
                    use the IBPS IDE
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 pt-2 pb-5">
                    IBPS IDE{" "}
                    <code className="font-bold pl-[2px]">{ideVersion}</code>
                    {"  •  "}
                    ibpscomp-rs{" "}
                    <code className="font-bold pl-[2px]">
                        {compilerVersion}
                    </code>{" "}
                    <br /> Created by{" "}
                    <a
                        className="underline underline-offset-2 font-medium"
                        target="blank"
                        href="https://inandioglu.com"
                    >
                        Baris
                    </a>
                </p>
                <button
                    onClick={() => setForceView(true)}
                    className="w-full py-2 bg-blue-500 text-white rounded-md"
                >
                    Continue Anyway
                </button>
            </div>
        </PythonProvider>
    );
};

export default Ide;

