import {DispatchActionsType, StateDialogsPageType, StateProfilePageType} from "./store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

export type FollowDispatchType = {
    type: 'FOLLOW'
    userId: number
}

export type UnfollowDispatchType = {
    type: 'UNFOLLOW'
    userId: number
}

export type setUsersDispatchType = {
    type: 'SET-USERS'
    users: UsersPageObjectsType[]
}

export type StateUsersObjectPageType = {
    usersPage: StateUsersPageType
}

export type StateUsersPageType = {
    users: UsersPageObjectsType[]
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
    users: []
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
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
};

export const followAC = (userId: number): FollowDispatchType => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): UnfollowDispatchType => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: UsersPageObjectsType[]): setUsersDispatchType => ({type: SET_USERS, users})

