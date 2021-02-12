import React, { useEffect, useState } from 'react'

const ws = new WebSocket(
  'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
)

export interface IChatMessage {
  message: string
  photo: string
  userId: number
  userName: string
}

const Chat: React.FC = () => {
  return (
    <>
      <ChatMessages />
      <ChatAddMessageForm />
    </>
  )
}

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([])

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    })
  }, [])

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

const ChatAddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')

  const handleCLickSendMessage = () => {
    if (!message) return
    ws.send(message)
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
        <button onClick={handleCLickSendMessage}>send</button>
      </div>
    </>
  )
}

export default Chat
