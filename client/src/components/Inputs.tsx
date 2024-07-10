import { IoSearchSharp } from "react-icons/io5"

export function SearchBar(){
    return (
        <div className="flex items-center w-full gap-3 px-2 py-1 rounded-[6px] outline-none h-9 bg-neutralOffWhite body-text-1 focus:border-2 border-neutralLine">
            <IoSearchSharp className="w-5 h-5 bg-neutralOffWhite text-neutralDisabled text-bold"/>
            <input type="text" className="w-full h-full border-none outline-none bg-neutralOffWhite" placeholder="Search" />
        </div>
    )
}