interface IDEPanelTopbarProps {
    children?: React.ReactNode;
    pl?: boolean;
    pr?: boolean;
    desktopUI?: boolean;
}

const IDEPanelTopbar: React.FC<IDEPanelTopbarProps> = (props) => {
    return (
        <div
            className={`
        ${props.pl ? "pl-3" : ""}
        ${props.pr ? "pr-3" : ""}
        ${props.desktopUI ? "border-r mr-[-1px] border-neutral-300 dark:border-black" : ""}
        ${props.desktopUI ? "bg-opacity-80 dark:bg-opacity-80" : ""}
        flex-shrink-0 border-b border-neutral-300 dark:border-black flex justify-between items-center h-9 py-[5px] text-sm w-full bg-neutral-50 text-black dark:text-white dark:bg-idedark-900`}
        >
            {props.children}
        </div>
    );
};

export default IDEPanelTopbar;

