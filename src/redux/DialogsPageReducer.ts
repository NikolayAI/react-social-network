import {AddMessageDispatchType, DispatchActionsType, StateDialogsPageType, UpdateMessageDispatchType} from "./store";

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

const initialState: StateDialogsPageType = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageText: '',
}

export const dialogsPageReducer = (state: StateDialogsPageType = initialState, action: DispatchActionsType) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let text = state.newMessageText
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: 10, message: text}]
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.text}
        default:
            return state
    }
}

export const addMessageActionCreator = (): AddMessageDispatchType => ({type: ADD_MESSAGE})
export const updateMessageActionCreator = (text: string): UpdateMessageDispatchType => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, text: text}
}