import { Avatar } from "./Avatar"

interface ContactCardProps{
    name: string,
    profilePic: string,
    subInfo: string
}

export function ContactCard({name, profilePic, subInfo} : ContactCardProps){
    return (
        <div className="flex gap-3 h-[56px] " >
            <Avatar imgSrc={profilePic} />
        <div className="flex flex-col gap-1">
            <p className="body-text-1">{name}</p>
            <p className="metadata-1">{subInfo}</p>
            </div>
        </div>
    )
}