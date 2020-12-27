import { createSelector } from 'reselect'
import { RootStateType } from '../reducers/rootReducer1'

const getUsers = (state: RootStateType) => state.usersPage.users
export const selectUsers = createSelector(getUsers, (users) => users)

export const selectPageSize = (state: RootStateType) => state.usersPage.pageSize
export const selectTotalUsersCount = (state: RootStateType) =>
    state.usersPage.totalUsersCount
export const selectCurrentPage = (state: RootStateType) => state.usersPage.currentPage
export const selectIsFetching = (state: RootStateType) => state.usersPage.isFetching
export const selectFollowingInProgress = (state: RootStateType) =>
    state.usersPage.followingInProgress
export const selectUsersFilter = (state: RootStateType) => state.usersPage.filter
