import { InferActionsTypes } from './rootReducer1'

const initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' },
    ] as StateDialogsPageDialogsItemType[],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
    ] as StateDialogsPageMessagesItemType[],
}

export const dialogsPageReducer = (
    state = initialState,
    action: ActionsDialogsPageTypes
): StateDialogsPageType => {
    switch (action.type) {
        case 's_n/dialogs/ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, { id: 10, message: action.payload }],
            }
        default:
            return state
    }
}

export const dialogsActions = {
    addMessage: (message: string) =>
        ({ type: 's_n/dialogs/ADD_MESSAGE', payload: message } as const),
}

export type StateDialogsPageDialogsItemType = {
    id: number
    name: string
}

export type StateDialogsPageMessagesItemType = {
    id: number
    message: string
}

export type StateDialogsPageType = typeof initialState
type ActionsDialogsPageTypes = InferActionsTypes<typeof dialogsActions>
