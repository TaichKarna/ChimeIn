type ButtonProps ={
    children: React.ReactNode,
    variant : string
}

export default function Button({children,variant} : ButtonProps){

    if(variant === "primary")
        return (
                 <div>{children}</div>
        )
}