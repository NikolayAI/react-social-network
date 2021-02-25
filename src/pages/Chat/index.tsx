import React, { useEffect, useRef, useState } from 'react'
import { IChatMessageApi } from '../../api/chatApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendMessage,
  startListeningMessages,
  stopListeningMessages,
} from '../../redux/reducers/chatReducer'
import { RootStateType } from '../../redux/reducers/rootReducer1'
import { selectStatus } from '../../redux/selectors/chatSelectors'

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)

  const x = status
  useEffect(() => {
    dispatch(startListeningMessages())
    return () => {
      dispatch(stopListeningMessages())
    }
  }, [])

  return (
    <>
      {status === 'error' && <div>Error. Please refresh page.</div>}
      <ChatMessages />
      <ChatAddMessageForm />
    </>
  )
}

const ChatMessages: React.FC = () => {
  const messages = useSelector((state: RootStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll)
      messagesAnchorRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
  }, [messages])

  return (
    <div style={{ height: 400, overflowY: 'auto' }} onScroll={scrollHandler}>
      {messages.map((item, i) => (
        <ChatMessage key={item.id} message={item} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

interface IChatMessageProps {
  message: IChatMessageApi
}

const ChatMessage: React.FC<IChatMessageProps> = React.memo(({ message }) => {
  return (
    <div>
      <img src={message.photo} alt='avatar' />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  )
})

const ChatAddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const status = useSelector(selectStatus)
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
        <button
          disabled={status === 'pending'}
          onClick={handleCLickSendMessage}
        >
          send
        </button>
      </div>
    </>
  )
}

export default Chat
