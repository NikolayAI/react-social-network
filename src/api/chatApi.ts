let subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket | null = null

const messageHandler = (e: MessageEvent) => {
  const newMessage = JSON.parse(e.data)
  subscribers['messages-received'].forEach((s) => s(newMessage))
}

const notifySubscribersAboutStatus = (status: ChatStatusType) => {
  subscribers['status-changed'].forEach((s) => s(status))
}

const createChannel = () => {
  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  )
  notifySubscribersAboutStatus('pending')
  ws.onclose = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
  }
  ws.onmessage = (e) => messageHandler(e)
  ws.onopen = () => notifySubscribersAboutStatus('ready')
  ws.onerror = () => {
    notifySubscribersAboutStatus('error')
    console.log('refresh page')
  }
}

export const chatAPI = {
  startChat() {
    createChannel()
  },
  stopChat() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    ws?.close()
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        (s) => s !== callback
      )
    }
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s) => s !== callback
    )
  },
  sendMessage(message: string) {
    ws?.send(message)
  },
}

type MessagesReceivedSubscriberType = (messages: IChatMessageApi[]) => void
type StatusChangedSubscriberType = (status: ChatStatusType) => void
type EventsNamesType = 'messages-received' | 'status-changed'
export type ChatStatusType = 'pending' | 'ready' | 'error'

export interface IChatMessageApi {
  message: string
  photo: string
  userId: number
  userName: string
}
