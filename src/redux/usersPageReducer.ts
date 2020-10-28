import {usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {updateObjectInArray} from "../utils/object-helpers";
import {ResponseUserType} from "../types/types";
import {Dispatch} from "react";
import {InferActionsTypes, RootStateType} from "./reduxStore";

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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.page}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.usersCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

export const usersPageActions = {
    followAC: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowAC: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsersAC: (users: Array<ResponseUserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPageAC: (page: number) => ({type: 'SET_CURRENT_PAGE', page} as const),
    setTotalUsersCountAC: (usersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        usersCount
    } as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) =>
        ({type: 'TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const),
}

type ActionsUsersPageTypes = InferActionsTypes<typeof usersPageActions>

type UsersThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsUsersPageTypes>

export const requestUsers = (page: number, pageSize: number): UsersThunkType =>
    async (dispatch) => {
    dispatch(usersPageActions.toggleIsFetchingAC(true))
    dispatch(usersPageActions.setCurrentPageAC(page))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(usersPageActions.toggleIsFetchingAC(false))
    dispatch(usersPageActions.setUsersAC(response.data.items))
    dispatch(usersPageActions.setTotalUsersCountAC(response.data.totalCount))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsUsersPageTypes>, userId: number, apiMethod: any,
                                   actionCreator: (userId: number) => ActionsUsersPageTypes) => {
    dispatch(usersPageActions.toggleFollowingProgressAC(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) dispatch(actionCreator(userId))
    dispatch(usersPageActions.toggleFollowingProgressAC(false, userId))
}

export const follow = (userId: number): UsersThunkType =>
    async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersPageActions.followAC)
}
export const unfollow = (userId: number): UsersThunkType =>
    async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersPageActions.unfollowAC)
}