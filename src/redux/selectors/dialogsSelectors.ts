import { createSelector } from 'reselect'
import { RootStateType } from '../reducers/rootReducer1'

export const getDialogsSuperSelector = (state: RootStateType) => state.dialogsPage.dialogs
export const getDialogs = createSelector(getDialogsSuperSelector, (dialogs) => dialogs)

export const getMessagesSuperSelector = (state: RootStateType) =>
    state.dialogsPage.messages

export const getMessages = createSelector(
    getMessagesSuperSelector,
    (messages) => messages
)
