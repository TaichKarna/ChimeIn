import { useDispatch } from "react-redux"
import { toggleTheme } from "./redux/theme/themeSlice";

function App() {
  const dispatch = useDispatch();
  const switchTheme = () => {
    dispatch(toggleTheme());
  }

  return (
    <>
        <div className=" bg-white dark:text-white dark:bg-black text-neutralActive">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. A atque tempora non iure dolorem molestias dicta eum, optio, odit labore cum blanditiis cupiditate in id. Adipisci distinctio a nihil deserunt!</h1>
          <button onClick={switchTheme} className="">switch</button>
      </div>
      
    </>
  )
}

export default App
