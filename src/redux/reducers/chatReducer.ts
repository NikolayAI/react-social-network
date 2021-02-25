import { InferActionsTypes } from './rootReducer1'
import { Dispatch } from 'redux'
import { chatAPI, ChatStatusType, IChatMessageApi } from '../../api/chatApi'
import { v1 } from 'uuid'

export interface IChatMessage extends IChatMessageApi {
  id: string
}

const initialState = {
  messages: [] as IChatMessage[],
  status: 'pending' as ChatStatusType,
}

export const chatReducer = (
  state = initialState,
  action: ActionsChatTypes
): StateChatType => {
  switch (action.type) {
    case 's_n/chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.map((m) => ({ ...m, id: v1() })),
        ].filter((m, i, arr) => i >= arr.length - 100),
      }
    case 's_n/chat/STATUS_CHANGED':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

const chatActions = {
  messagesReceived: (messages: IChatMessageApi[]) =>
    ({ type: 's_n/chat/MESSAGES_RECEIVED', payload: messages } as const),
  statusChanged: (status: ChatStatusType) =>
    ({ type: 's_n/chat/STATUS_CHANGED', payload: status } as const),
}

let _newMessageHandler: ((messages: IChatMessageApi[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatActions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: ChatStatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(chatActions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startListeningMessages = () => async (dispatch: Dispatch) => {
  chatAPI.startChat()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopListeningMessages = () => async (dispatch: Dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stopChat()
}

export const sendMessage = (message: string) => async (dispatch: Dispatch) => {
  chatAPI.sendMessage(message)
}

export type StateChatObjectType = {
  chat: StateChatType
}
export type StateChatType = typeof initialState
type ActionsChatTypes = InferActionsTypes<typeof chatActions>
