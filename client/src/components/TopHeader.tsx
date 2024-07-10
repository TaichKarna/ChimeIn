
export type TopHeaderProps = {
    children : React.ReactNode
}

export function TopHeaderContainer({children} : TopHeaderProps){
    return (
        <div className="sticky top-0 flex justify-between w-full px-6 py-4">
            {children}
        </div>
    )
}

export function MainContainer({children} : TopHeaderProps){
    return (
        <div className="flex flex-col w-full gap-4 px-6 py-4">
            {children}
        </div>
    )
}