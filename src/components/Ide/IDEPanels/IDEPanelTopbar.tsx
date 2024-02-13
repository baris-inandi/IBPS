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
        ${props.desktopUI ? "mr-[-1px] border-r border-neutral-300 dark:border-black" : ""}
        ${props.desktopUI ? "bg-opacity-75 dark:bg-opacity-75" : ""}
        flex h-9 w-full flex-shrink-0 items-center justify-between border-b border-neutral-300 bg-neutral-50 py-[5px] text-sm text-black dark:border-black dark:bg-idedark-900 dark:text-white`}
        >
            {props.children}
        </div>
    );
};

export default IDEPanelTopbar;
