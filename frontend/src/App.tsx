import { useEffect } from 'react'

import './App.css'

function App() {

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
  }, []);

  function sendMessage() {

  }

  return (
    <div>
      <input type="text" placeholder="message..."/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
