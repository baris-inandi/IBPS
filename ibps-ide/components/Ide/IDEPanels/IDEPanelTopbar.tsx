import { FunctionalComponent } from "preact";

interface IDEPanelTopbarProps {
  children?: React.ReactNode;
  pl?: boolean;
  pr?: boolean;
  desktopUI?: boolean;
}

const IDEPanelTopbar: FunctionalComponent<IDEPanelTopbarProps> = (props) => {
  return (
    <div
      className={`
        ide-panel-topbar
        ${props.pl ? "pl-3" : ""}
        ${props.pr ? "pr-3" : ""}
        ${props.desktopUI ? "mr-[-1px] border-r border-idelight-300 dark:border-idedark-border" : ""}
        ${props.desktopUI ? "bg-opacity-75 dark:bg-opacity-75" : ""}
        flex h-10 w-full flex-shrink-0 items-center justify-between border-b border-idelight-300 bg-idelight-50 py-[6px] text-sm text-idelight-700 dark:border-idedark-border dark:bg-idedark-900 dark:text-white`}
    >
      {props.children}
    </div>
  );
};

export default IDEPanelTopbar;
