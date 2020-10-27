const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<StateDialogsPageDialogsItemType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<StateDialogsPageMessagesItemType>,
}

export type StateDialogsPageDialogsItemType = {
    id: number
    name: string
}
export type StateDialogsPageMessagesItemType = {
    id: number
    message: string
}
export type StateDialogsObjectPageType = {
    dialogsPage: StateDialogsPageType
}
export type StateDialogsPageType = typeof initialState

export const dialogsPageReducer = (state = initialState, action: ActionsDialogsPageTypes): StateDialogsPageType => {
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

const ADD_MESSAGE = 'social_network/dialogs/ADD_MESSAGE'

export type AddMessageDialogsPageActionType = {
    type: typeof ADD_MESSAGE
    text: string
}

type ActionsDialogsPageTypes = AddMessageDialogsPageActionType

export const addMessageAC = (text: string): AddMessageDialogsPageActionType => ({type: ADD_MESSAGE, text})

// export type StateDialogsPageType = {
//     dialogs: StateDialogsPageDialogsItemType[]
//     messages: StateDialogsPageMessagesItemType[]
// }