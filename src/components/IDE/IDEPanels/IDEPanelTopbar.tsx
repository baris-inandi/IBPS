interface IDEPanelTopbarProps {
  children?: React.ReactNode;
  pl?: boolean;
  pr?: boolean;
}

const IDEPanelTopbar: React.FC<IDEPanelTopbarProps> = (props) => {
  return (
    <div
      className={`
      ${props.pl ? "pl-3" : ""}
      ${props.pr ? "pr-3" : ""}
      flex-shrink-0 border-b border-neutral-400 dark:border-black flex justify-between items-center h-9 pt-[1px] text-sm w-full bg-neutral-300 dark:bg-onedark-900`}
    >
      {props.children}
    </div>
  );
};

export default IDEPanelTopbar;
