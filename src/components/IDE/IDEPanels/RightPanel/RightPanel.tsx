import { useAtom } from "jotai";
import { activeRightPanelAtom } from "../../../../atoms/atoms";

const RightPanel = () => {
  const [activeRightPanel] = useAtom(activeRightPanelAtom);
  return (
    <div className="h-full bg-neutral-100 dark:bg-onedark-950">
      {activeRightPanel}
    </div>
  );
};

export default RightPanel;

