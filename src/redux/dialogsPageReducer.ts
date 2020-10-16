const ADD_MESSAGE = 'ADD_MESSAGE'

export type AddMessageDialogsPageACType = {
    type: 'ADD_MESSAGE'
    text: string
}

type ActionsDialogsPageTypes = AddMessageDialogsPageACType

export type StateDialogsObjectPageType = {
    dialogsPage: StateDialogsPageType
}

export type StateDialogsPageMessagesItemType = {
    id: number
    message: string
}

export type StateDialogsPageDialogsItemType = {
    id: number
    name: string
}

export type StateDialogsPageType = {
    messages: StateDialogsPageMessagesItemType[]
    dialogs: StateDialogsPageDialogsItemType[]
}

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
}

export const dialogsPageReducer = (state: StateDialogsPageType = initialState, action: ActionsDialogsPageTypes): StateDialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 10, message: action.text}]
            }
        default:
            return state
    }
}

export const addMessageAC = (text: string): AddMessageDialogsPageACType => ({type: ADD_MESSAGE, text})
