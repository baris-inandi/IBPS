import { AiOutlineSearch } from "react-icons/ai";

const IDESearchBar = () => {
    return (
        <div className="pr-10 h-full w-full flex gap-2 items-center text-sm">
            <div className="flex items-center gap-2">
                <div className="bg-neutral-300 rounded-md flex items-center pl-2 pr-3 gap-2">
                    <AiOutlineSearch></AiOutlineSearch>
                    <span>Search</span>
                </div>
            </div>
        </div>
    );
};

export default IDESearchBar;
