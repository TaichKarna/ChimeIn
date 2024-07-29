import { TopHeaderContainer } from "../components/TopHeader"
import { socket } from "../socket/socket"
import { ChevronLeft, Search, AlignJustify } from "lucide-react";
import { InputBar } from "../components/Inputs";



export default function ChatWindow({data}){
    socket.connect();

    const handleMessage = async(message) => {
        socket.emit("chat message", {chatId: data.chatId, message: message });
    }
    return (
        <div className="w-full">
           <ChatBox name={data.contactName} data={""} sendMessage = {handleMessage}/>
        </div>
    )
}


function ChatBox({name, data, sendMessage}){
    
    return(
        <div className="w-full">
            <TopHeaderContainer>
                <div className="flex items-center gap-2">
                    <ChevronLeft className=""/>
                    <h3 className="subheading-1">{name}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Search className="h-5 text-neutralActive"/>
                    <AlignJustify/>
                </div>
            </TopHeaderContainer>
            <div className="absolute bottom-0 w-full ">
                <InputBar sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

function ChatContainer(){
    return(
        <div className="px-6 ">

        </div>
    )
}