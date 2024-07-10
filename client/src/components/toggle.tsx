import { useDispatch } from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Toggle(){
    const dispatch = useDispatch();
    const clicked = () => {
        dispatch(toggleTheme())
    }
    return(
        <button className="w-32" onClick={clicked}>Switch Theme</button>
    )
}