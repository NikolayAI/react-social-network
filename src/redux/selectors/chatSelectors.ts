import { RootStateType } from '../reducers/rootReducer1'
import { createSelector } from 'reselect'

const getStatus = (state: RootStateType) => state.chat.status
export const selectStatus = createSelector(getStatus, (status) => status)
