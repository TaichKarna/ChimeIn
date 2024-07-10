import MainWindow from "./pages/MainWindow"
import Chats from "./pages/ChatWindow"

function App() {
  return (
    <div className="flex flex-nowrap">
      <div className="min-h-screen  sm:max-w-[400px] w-full">
        <MainWindow/>
      </div>
      <div className="hidden w-full min-h-screen sm:block">
        <Chats/>
      </div>
    </div>
  )
}

export default App
