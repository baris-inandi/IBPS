import { AiOutlineSearch } from "react-icons/ai";

const IDESearchBar = () => {
    return (
        <div className="flex h-full w-full items-center gap-2 pr-10 text-sm">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md bg-neutral-300 pl-2 pr-3">
                    <AiOutlineSearch></AiOutlineSearch>
                    <span>Search</span>
                </div>
            </div>
        </div>
    );
};

export default IDESearchBar;
