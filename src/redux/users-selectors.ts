import {createSelector} from "reselect";
import {GlobalStateType} from "./reduxStore";

export const getUsersSuperSelector = (state: GlobalStateType) => state.usersPage.users
export const getUsers = createSelector(getUsersSuperSelector, (users) => users)

export const getPageSize = (state: GlobalStateType) => state.usersPage.pageSize
export const getTotalUsersCount = (state: GlobalStateType) => state.usersPage.totalUsersCount
export const getCurrentPage = (state: GlobalStateType) => state.usersPage.currentPage
export const getIsFetching = (state: GlobalStateType) => state.usersPage.isFetching
export const getFollowingInProgress = (state: GlobalStateType) => state.usersPage.followingInProgress
export const getUsersFilter = (state: GlobalStateType) => state.usersPage.filter