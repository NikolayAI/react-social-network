import { getAuthUserData } from './authReducer'
import { BaseThunkType, InferActionsTypes } from './rootReducer1'
import { Dispatch } from 'redux'
import { chatAPI, IChatMessage } from '../../api/chatApi'

const initialState = {
  messages: [] as IChatMessage[],
}

export const chatReducer = (
  state = initialState,
  action: ActionsChatTypes
): StateChatType => {
  switch (action.type) {
    case 's_n/chat/MESSAGES_RECEIVED':
      return { ...state, messages: [...state.messages, ...action.payload] }
    default:
      return state
  }
}

const chatActions = {
  messagesReceived: (messages: IChatMessage[]) =>
    ({ type: 's_n/chat/MESSAGES_RECEIVED', payload: messages } as const),
}

let _newMessageHandler: ((messages: IChatMessage[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatActions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

export const startListeningMessages = () => async (dispatch: Dispatch) => {
  chatAPI.startChat()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopListeningMessages = () => async (dispatch: Dispatch) => {
  chatAPI.stopChat()
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string) => async (dispatch: Dispatch) => {
  chatAPI.sendMessage(message)
}

export type StateChatObjectType = {
  chat: StateChatType
}
export type StateChatType = typeof initialState
type ActionsChatTypes = InferActionsTypes<typeof chatActions>
