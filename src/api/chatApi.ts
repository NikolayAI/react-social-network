let subscribers: SubscriberType[] = []

let ws: WebSocket | null = null

const messageHandler = (e: MessageEvent) => {
  const newMessage = JSON.parse(e.data)
  subscribers.forEach((s) => s(newMessage))
}

const createChannel = () => {
  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  )
  ws.onclose = () => setTimeout(createChannel, 3000)
  ws.onmessage = () => messageHandler
}

export const chatAPI = {
  startChat() {
    createChannel()
  },
  stopChat() {
    subscribers = []
    ws?.close()
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter((s) => s !== callback)
    }
  },
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter((s) => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  },
}

type SubscriberType = (messages: IChatMessage[]) => void

export interface IChatMessage {
  message: string
  photo: string
  userId: number
  userName: string
}
