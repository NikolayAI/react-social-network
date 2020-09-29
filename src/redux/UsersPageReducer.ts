import {DispatchActionsType, StateDialogsPageType, StateProfilePageType} from "./store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

export type FollowDispatchType = {
    type: 'FOLLOW'
    userId: number
}

export type UnfollowDispatchType = {
    type: 'UNFOLLOW'
    userId: number
}

export type SetUsersDispatchType = {
    type: 'SET_USERS'
    users: UsersPageObjectsType[]
}

export type SetCurrentPageType = {
    type: 'SET_CURRENT_PAGE'
    page: number
}

export type SetTotalUsersCountType = {
    type: 'SET_TOTAL_USERS_COUNT'
    usersCount: number
}

export type ToggleIsFetchingType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
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
}

export type UsersPageObjectsType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: {small: string, large: string}
    status: string | null
    followed: boolean
}

export type UsersPageLocationType = {
    city: string
    country: string
}

const initialState: StateUsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}

export const usersPageReducer = (state: StateUsersPageType = initialState, action: DispatchActionsType) => {
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
        default:
            return state;
    }
};

export const followAC = (userId: number): FollowDispatchType => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): UnfollowDispatchType => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: UsersPageObjectsType[]): SetUsersDispatchType => ({type: SET_USERS, users})
export const setCurrentPageAC = (page: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, page})
export const setTotalUsersCountAC = (usersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, usersCount})
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})

