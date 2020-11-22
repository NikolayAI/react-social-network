import {InferActionsTypes} from "./reduxStore"


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


export const dialogsPageReducer = (state = initialState, action: ActionsDialogsPageTypes): StateDialogsPageType => {
    switch (action.type) {
        case 's_n/dialogs/ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {id: 10, message: action.text}]
            }
        default:
            return state
    }
}


export const dialogsActions = {
    addMessageAC: (text: string) => ({type: 's_n/dialogs/ADD_MESSAGE', text} as const)
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
type ActionsDialogsPageTypes = InferActionsTypes<typeof dialogsActions>