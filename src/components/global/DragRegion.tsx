import useFiles from "../../hooks/useFiles";

const DragRegion: React.FC = () => {
    const { activeFile } = useFiles();

    return (
        <div
            data-tauri-drag-region
            className="w-screen h-[28px] bg-white dark:bg-idedark-700 bg-opacity-85 dark:bg-opacity-85 border-b border-neutral-300 dark:border-black"
        >
            <div className="h-full w-full flex items-center justify-center text-sm font-medium pointer-events-none">
                <div className="font-bold">IBPS IDE</div>
                <div className="px-1">•</div>
                <div
                    className="grow-0 shrink overflow-hidden truncate"
                    style={{ maxWidth: "50%" }}
                >
                    {activeFile}
                </div>
            </div>
        </div>
    );
};

export default DragRegion;
