import React, { useEffect, useState } from 'react'

export interface IChatMessage {
  message: string
  photo: string
  userId: number
  userName: string
}

const Chat: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    const createChannel = () => {
      let ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
      )
      ws.onclose = () => setTimeout(createChannel, 3000)
      setWs(ws)
    }
    createChannel()
    return () => ws?.close()
  }, [])

  return (
    <>
      <ChatMessages ws={ws} />
      <ChatAddMessageForm ws={ws} />
    </>
  )
}

interface IChatMessages {
  ws: WebSocket | null
}

const ChatMessages: React.FC<IChatMessages> = ({ ws }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([])

  useEffect(() => {
    if (ws) {
      ws.onmessage = (e) => {
        setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
      }
    }
    return () => ws?.close()
  }, [ws])

  return (
    <div style={{ height: 400, overflowY: 'auto' }}>
      {messages.map((item, i) => (
        <ChatMessage key={i} message={item} />
      ))}
    </div>
  )
}

interface IChatMessageProps {
  message: IChatMessage
}

const ChatMessage: React.FC<IChatMessageProps> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} alt='avatar' />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  )
}

interface IChatAddMessageForm {
  ws: WebSocket | null
}

const ChatAddMessageForm: React.FC<IChatAddMessageForm> = ({ ws }) => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    if (ws) {
      ws.onopen = () => setReadyStatus('ready')
    }
    return () => ws?.close()
  }, [ws])

  const handleCLickSendMessage = () => {
    if (!message) return
    ws?.send(message)
    setMessage('')
  }

  return (
    <>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
      </div>
      <div>
        <button
          disabled={readyStatus !== 'ready' || ws === null}
          onClick={handleCLickSendMessage}
        >
          send
        </button>
      </div>
    </>
  )
}

export default Chat
