import { updateObjectInArray } from '../../utils/object-helpers'
import { Dispatch } from 'react'
import { usersAPI } from '../../api/usersApi'
import { APIResponseType, ResponseUserType } from '../../api/api'
import { BaseThunkType, InferActionsTypes } from './rootReducer'

const initialState = {
    users: [] as Array<ResponseUserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users id
    filter: {
        term: '',
        friend: null as null | boolean,
    },
}

export const usersPageReducer = (
    state = initialState,
    action: ActionsUsersPageTypes
): StateUsersPageType => {
    switch (action.type) {
        case 's_n/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, 'id', {
                    followed: true,
                }),
            }
        case 's_n/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, 'id', {
                    followed: false,
                }),
            }
        case 's_n/users/SET_USERS':
            return { ...state, users: action.payload, isFetching: false }
        case 's_n/users/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload }
        case 's_n/users/SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.payload }
        case 's_n/users/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.payload }
        case 's_n/users/SET_FILTER':
            return { ...state, filter: action.payload }
        case 's_n/users/TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.payload.userId
                      ),
            }
        default:
            return state
    }
}

export const usersPageActions = {
    followAC: (userId: number) =>
        ({ type: 's_n/users/FOLLOW', payload: userId } as const),
    unfollowAC: (userId: number) =>
        ({ type: 's_n/users/UNFOLLOW', payload: userId } as const),
    setUsersAC: (users: Array<ResponseUserType>) =>
        ({ type: 's_n/users/SET_USERS', payload: users } as const),
    setCurrentPageAC: (page: number) =>
        ({ type: 's_n/users/SET_CURRENT_PAGE', payload: page } as const),
    setTotalUsersCountAC: (usersCount: number) =>
        ({ type: 's_n/users/SET_TOTAL_USERS_COUNT', payload: usersCount } as const),
    toggleIsFetchingAC: (isFetching: boolean) =>
        ({ type: 's_n/users/TOGGLE_IS_FETCHING', payload: isFetching } as const),
    setFilterAC: (filter: UsersPageFilterType) =>
        ({ type: 's_n/users/SET_FILTER', payload: filter } as const),
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) =>
        ({
            type: 's_n/users/TOGGLE_FOLLOWING_PROGRESS',
            payload: { isFetching, userId },
        } as const),
}

export const requestUsers = (
    page: number,
    pageSize: number,
    filter: UsersPageFilterType
): UsersThunkType => async (dispatch) => {
    dispatch(usersPageActions.toggleIsFetchingAC(true))
    dispatch(usersPageActions.setCurrentPageAC(page))
    dispatch(usersPageActions.setFilterAC(filter))
    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
    dispatch(usersPageActions.setUsersAC(data.items))
    dispatch(usersPageActions.setTotalUsersCountAC(data.totalCount))
}

export const follow = (userId: number): UsersThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.follow.bind(usersAPI),
        usersPageActions.followAC
    )
}

export const unfollow = (userId: number): UsersThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.unfollow.bind(usersAPI),
        usersPageActions.unfollowAC
    )
}

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsUsersPageTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsUsersPageTypes
) => {
    dispatch(usersPageActions.toggleFollowingProgressAC(true, userId))
    const data = await apiMethod(userId)
    if (!data.resultCode) dispatch(actionCreator(userId))
    dispatch(usersPageActions.toggleFollowingProgressAC(false, userId))
}

export type StateUsersPageType = typeof initialState
export type UsersPageFilterType = typeof initialState.filter
type ActionsUsersPageTypes = InferActionsTypes<typeof usersPageActions>
type UsersThunkType = BaseThunkType<ActionsUsersPageTypes>
