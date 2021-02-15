import React, { useEffect, useState } from 'react'
import { IChatMessage } from '../../api/chatApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendMessage,
  startListeningMessages,
  stopListeningMessages,
} from '../../redux/reducers/chatReducer'
import { RootStateType } from '../../redux/reducers/rootReducer1'

const Chat: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startListeningMessages())
    return () => {
      dispatch(stopListeningMessages())
    }
  }, [])

  return (
    <>
      <ChatMessages />
      <ChatAddMessageForm />
    </>
  )
}

const ChatMessages: React.FC = () => {
  const messages = useSelector((state: RootStateType) => state.chat.messages)

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
  const dispatch = useDispatch()

  const handleCLickSendMessage = () => {
    if (!message) return
    dispatch(sendMessage(message))
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
        <button disabled={false} onClick={handleCLickSendMessage}>
          send
        </button>
      </div>
    </>
  )
}

export default Chat
