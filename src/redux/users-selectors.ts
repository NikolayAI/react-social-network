import {StateUsersObjectPageType} from "./usersPageReducer";
import {createSelector} from "reselect";

export const getUsersSuperSelector = (state: StateUsersObjectPageType) => state.usersPage.users
export const getUsers = createSelector(getUsersSuperSelector, (users) => users)

export const getPageSize = (state: StateUsersObjectPageType) => state.usersPage.pageSize
export const getTotalUsersCount = (state: StateUsersObjectPageType) => state.usersPage.totalUsersCount
export const getCurrentPage = (state: StateUsersObjectPageType) => state.usersPage.currentPage
export const getIsFetching = (state: StateUsersObjectPageType) => state.usersPage.isFetching
export const getFollowingInProgress = (state: StateUsersObjectPageType) => state.usersPage.followingInProgress