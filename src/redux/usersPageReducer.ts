import {usersAPI} from "../api/api";
import {ThunkDispatch, ThunkAction} from "redux-thunk";
import {updateObjectInArray} from "../utils/object-helpers";
import {ResponseUserType} from "../types/types";
import {Dispatch} from "react";
import {RootStateType} from "./reduxStore";

const initialState = {
    users: [] as Array<ResponseUserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users id
}

export type StateUsersPageType = typeof initialState

export const usersPageReducer = (state = initialState, action: ActionsUsersPageTypes): StateUsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.usersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

const FOLLOW = 'social_network/users/FOLLOW'
const UNFOLLOW = 'social_network/users/UNFOLLOW'
const SET_USERS = 'social_network/users/SET_USERS'
const SET_CURRENT_PAGE = 'social_network/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'social_network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social_network/users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'social_network/users/TOGGLE_FOLLOWING_PROGRESS'

export type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export type SetUsersActionType = {
    type: typeof SET_USERS
    users: ResponseUserType[]
}
export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    page: number
}
export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    usersCount: number
}
export type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

type ActionsUsersPageTypes = FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType

type UsersThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsUsersPageTypes>

export const followAC = (userId: number): FollowActionType => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: Array<ResponseUserType>): SetUsersActionType => ({type: SET_USERS, users})
export const setCurrentPageAC = (page: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, page})
export const setTotalUsersCountAC = (usersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    usersCount
})
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
    return {type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId}
}

export const requestUsers = (page: number, pageSize: number): UsersThunkType =>
    async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(page))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAC(response.data.items))
    dispatch(setTotalUsersCountAC(response.data.totalCount))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsUsersPageTypes>, userId: number, apiMethod: any,
                                   actionCreator: (userId: number) => FollowActionType | UnfollowActionType) => {
    dispatch(toggleFollowingProgressAC(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) dispatch(actionCreator(userId))
    dispatch(toggleFollowingProgressAC(false, userId))
}

export const follow = (userId: number): UsersThunkType =>
    async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followAC)
}
export const unfollow = (userId: number): UsersThunkType =>
    async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowAC)
}

// export type StateUsersPageType = {
//     users: UsersPageObjectsType[]
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
//     followingInProgress: number[]
// }
