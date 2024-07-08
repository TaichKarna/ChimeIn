import lightWelcome from "../assets/icons/nothing.svg"
import welcomeDark from '../assets/icons/welcomeDark.svg'
import { Link } from "react-router-dom";

export default function WelcomePage(){
    return (
        <div className="flex flex-col items-center max-w-4xl min-h-screen p-3 pt-10 mx-auto md:flex-row md:justify-center md:pt-0 " >
            <div className="flex justify-center flex-1 ">
                <img src={lightWelcome} alt="" className="dark:hidden"/>
                <img src={welcomeDark} alt="" className="hidden dark:block"/>
            </div>
            <div className="flex flex-col items-center flex-1 ">
                <h2 className="p-6 font-semibold text-center heading-2">Connect easily with your family and friends over countries</h2>
                <div className="absolute flex flex-col-reverse items-center justify-center w-full gap-3 p-3 md:w-auto bottom-5 md:relative md:flex-col ">
                  <Link to="/signup" className="w-full">   
                <button className="bg-brandDefault text-neutralOffWhite flex justify-center rounded-full hover:bg-brandDark
                focus:bg-brandDefault focus:shadow-[0px_0px_10px_10px] focus:shadow-brandBackground outline-none
                py-4 w-full disabled:bg-brandLight md:px-5 dark:bg-brandDarkMode dark:hover:bg-brandDefault subheading-2">
                   Start Messaging
                </button></Link>
                    <p className="body-text-1">Terms & Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}