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
        ${props.pl ? "pl-3" : ""}
        ${props.pr ? "pr-3" : ""}
        ${props.desktopUI ? "dark:border-idedark-border mr-[-1px] border-r border-idelight-300" : ""}
        ${props.desktopUI ? "bg-opacity-75 dark:bg-opacity-75" : ""}
        dark:border-idedark-border flex h-10 w-full flex-shrink-0 items-center justify-between border-b border-idelight-300 bg-idelight-50 py-[6px] text-sm text-black dark:bg-idedark-900 dark:text-white`}
    >
      {props.children}
    </div>
  );
};

export default IDEPanelTopbar;
