import RunButton from "../../global/RunButton";

interface WindowTitleBarProps {}

const WindowTitleBar: React.FC<WindowTitleBarProps> = () => {
    return (
        <div className="border-b border-neutral-300 bg-neutral-100 dark:bg-idedark-800 dark:border-black flex items-center justify-between py-2 px-1 max-h-8">
            yes
            <RunButton />
        </div>
    );
};

export default WindowTitleBar;
