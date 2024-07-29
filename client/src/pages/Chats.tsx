import {useGetuserchatsMutation } from "../rtk-query/apiSlice"
import { Plus } from "lucide-react"; 
import { SearchBar } from "../components/Inputs";
import { MainContainer, TopHeaderContainer } from "../components/TopHeader"
import { ContactCard } from "../components/Cards";

export default function Chats(){
   const [getUserChats, {isLoading}] = useGetuserchatsMutation();
    let chats;
   const callFunc = async () => {
    chats = getUserChats().unwrap();
    
   }

   callFunc()
   return(
    <div className="w-full">
      <TopHeaderContainer>
         <h3 className="subheading-1">Chats</h3>
         <Plus className="h-5"/>
      </TopHeaderContainer>
      <MainContainer>
               <SearchBar/>
               {
                  chats.map( chat => (
                    <div className="pb-2 border-b-[1.5px] border-b-neutralLine">
                        <ContactCard name={chat.name} profilePic={chat.profilePic} subInfo={chat.lastSeen} key={chat.id}/>
                    </div>
                  ))
               }
      </MainContainer>
    </div>
   ) 
}


