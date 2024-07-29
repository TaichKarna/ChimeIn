import { IoSearchSharp } from "react-icons/io5"
import {Plus, Send} from 'lucide-react'
import { useState } from "react"

export function SearchBar(){
    return (
        <div className="flex items-center w-full gap-3 px-2 py-1 rounded-[6px] outline-none h-9 bg-neutralOffWhite body-text-1 focus:border-2 border-neutralLine">
            <IoSearchSharp className="w-5 h-5 bg-neutralOffWhite text-neutralDisabled text-bold"/>
            <input type="text" className="w-full h-full border-none outline-none bg-neutralOffWhite" placeholder="Search" />
        </div>
    )
}

export function InputBar({sendMessage}){
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    }
    return(
        <form className="flex items-center w-full gap-2 px-3 py-4 border-1 border-neutralLine bg-neutralWhite" onSubmit={handleSubmit}>
            <Plus/>
            <input type="text" className="w-full px-1 py-1 border-none rounded-r-sm outline-none h-9 bg-neutralOffWhite text-neutralDisabled" placeholder="Search" onChange={(e) => setMessage(e.target.value)} value={message}/>
            <button type="submit">
                <Send/>
            </button>
        </form>
    )
}