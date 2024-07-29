import MainWindow from "./pages/MainWindow"
import ChatWindow from "./pages/ChatWindow"



function App() {
  const data = {
    id: '8efd9e96-590f-42cf-b7c6-47fd9c51bbaf',
    userId: '5281b6d2-2f59-48d3-9cb4-0ce9e0c0cf7b',
    chatId: 'd2a43894-aece-4400-acd3-2dbbc87f0c10',
    contactName: 'Emma Black',
    contactId: 'ecffdb99-28d9-466a-8f55-c9a2d7dd318f'
  }
  return (
    <div className="flex flex-nowrap">
      <div className="min-h-screen  sm:max-w-[400px] w-full hidden">
        <MainWindow/>
      </div>
      <div className="w-full min-h-screen sm:block">
        <ChatWindow data={data}/>
      </div>
    </div>
  )
}

export default App
