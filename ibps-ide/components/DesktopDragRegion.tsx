import useFiles from "../hooks/useFiles";

const DragRegion = () => {
  const { activeFile } = useFiles();

  return (
    <div
      data-tauri-drag-region
      className="h-[28px] w-screen bg-white bg-opacity-85 dark:bg-idedark-700 dark:bg-opacity-85"
    >
      <div className="pointer-events-none flex h-full w-full items-center justify-center text-sm font-medium">
        <div className="font-bold">IBPS IDE</div>
        <div className="px-1">•</div>
        <div
          className="shrink grow-0 overflow-hidden truncate"
          style={{ maxWidth: "50%" }}
        >
          {activeFile}
        </div>
      </div>
    </div>
  );
};

export default DragRegion;
