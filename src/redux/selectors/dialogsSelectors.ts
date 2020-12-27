import { createSelector } from 'reselect'
import { RootStateType } from '../reducers/rootReducer1'

const getDialogs = (state: RootStateType) => state.dialogsPage.dialogs
export const selectDialogs = createSelector(getDialogs, (dialogs) => dialogs)

const getMessages = (state: RootStateType) => state.dialogsPage.messages
export const selectMessages = createSelector(getMessages, (messages) => messages)
