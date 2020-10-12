import {usersAPI} from "../api/api";
import { ThunkDispatch } from "redux-thunk";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

export type FollowACType = {
    type: 'FOLLOW'
    userId: number
}

export type UnfollowACType = {
    type: 'UNFOLLOW'
    userId: number
}

export type SetUsersACType = {
    type: 'SET_USERS'
    users: UsersPageObjectsType[]
}

export type SetCurrentPageACType = {
    type: 'SET_CURRENT_PAGE'
    page: number
}

export type SetTotalUsersCountACType = {
    type: 'SET_TOTAL_USERS_COUNT'
    usersCount: number
}

export type ToggleIsFetchingACType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}

export type ToggleFollowingProgressACType = {
    type: 'TOGGLE_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}

export type StateUsersObjectPageType = {
    usersPage: StateUsersPageType
}

export type StateUsersPageType = {
    users: UsersPageObjectsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UsersPageObjectsType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: { small: string, large: string }
    status: string | null
    followed: boolean
}

type ActionsUsersPageTypes = FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | ToggleIsFetchingACType
    | ToggleFollowingProgressACType

const initialState: StateUsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

export const usersPageReducer = (state: StateUsersPageType = initialState, action: ActionsUsersPageTypes): StateUsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
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

export const followAC = (userId: number): FollowACType => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): UnfollowACType => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: UsersPageObjectsType[]): SetUsersACType => ({type: SET_USERS, users})
export const setCurrentPageAC = (page: number): SetCurrentPageACType => ({type: SET_CURRENT_PAGE, page})
export const setTotalUsersCountAC = (usersCount: number): SetTotalUsersCountACType => ({
    type: SET_TOTAL_USERS_COUNT,
    usersCount
})
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingACType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number): ToggleFollowingProgressACType => {
    return {type: "TOGGLE_FOLLOWING_PROGRESS", isFetching, userId}
}

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: ThunkDispatch<StateUsersPageType, {}, ActionsUsersPageTypes>) => {
    dispatch(toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(response => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(response.data.items))
            dispatch(setTotalUsersCountAC(response.data.totalCount))
        })
}
export const follow = (userId: number ) => (dispatch: ThunkDispatch<StateUsersPageType, {}, ActionsUsersPageTypes>) => {
    dispatch(toggleFollowingProgressAC(true, userId))
    usersAPI.follow(userId)
        .then(response => {
            if (response.data.resultCode === 0) dispatch(followAC(userId))
            dispatch(toggleFollowingProgressAC(false, userId))
        })
}
export const unfollow = (userId: number ) => (dispatch: ThunkDispatch<StateUsersPageType, {}, ActionsUsersPageTypes>) => {
    dispatch(toggleFollowingProgressAC(true, userId))
    usersAPI.unfollow(userId)
        .then(response => {
            if (response.data.resultCode === 0) dispatch(unfollowAC(userId))
            dispatch(toggleFollowingProgressAC(false, userId))
        })
}
