import { useAtom } from "jotai";
import { activeRightPanelAtom } from "../../../../atoms/atoms";
import OutputView from "./OutputView/OutputView";
import ReplView from "./ReplView/ReplView";

const RightPanel = () => {
    const [activeRightPanel] = useAtom(activeRightPanelAtom);
    return (
        <div className="h-full bg-stone-100 dark:bg-onedark-950">
            {activeRightPanel === 0 ? <OutputView /> : <ReplView />}
        </div>
    );
};

export default RightPanel;
