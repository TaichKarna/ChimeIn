import WelcomePage from "../pages/WelcomePage";
import { useAppSelector } from "../redux/hooks/hook";
import {Outlet} from 'react-router-dom'

export default function RouterRedirector(){
    const {currentUser} = useAppSelector(state => state.user);
    
    return(
        currentUser? <Outlet/> : <WelcomePage/>
    )
}