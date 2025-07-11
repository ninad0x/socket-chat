import { useEffect, useRef, useState} from 'react'

import './App.css'

function App() {

  const [messages, setMessages] = useState(["Hi there"]);
  const wsRef = useRef<WebSocket>(null);
  const inputRef = useRef<HTMLButtonElement>()


  function sendMessage() {

    if (inputRef.current.value === "") return
    
    const message = inputRef.current.value;
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message
        }
      })
    )
    inputRef.current.value = ""
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    ws.onmessage = (e) => {
      setMessages(m => [...m, e.data])
    }
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    return () => {
      ws.close()
  }
    
  }, [])

  return (
    <div className='h-screen bg-gray-400 justify-between flex flex-col p-4'>
      <div>
        {messages.map(e => 
        <div className='bg-white p-2 mb-1 rounded-lg w-fit'>{e}</div>
        )}
      </div>
      <div>
        <input ref={inputRef} className='bg-white px-8 py-4 rounded-l-2xl' type="text" placeholder="message..."/>
        <button className='px-8 py-4 bg-violet-500 hover:bg-violet-600 cursor-pointer rounded-r-2xl text-white' onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
