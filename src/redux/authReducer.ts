import {authAPI, usersAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const SET_AUTH_USER_PHOTO = 'SET_AUTH_USER_PHOTO'


// export type UsersPageObjectsType = {
//     name: string
//     id: number
//     uniqueUrlName: string | null
//     photos: {small: string, large: string}
//     status: string | null
//     followed: boolean
// }
export type SetAuthUserDataACType = {
    type: 'SET_AUTH_USER_DATA'
    payload: StateDataObjectType
}

export type SetAuthUserPhotoACType = {
    type: 'SET_AUTH_USER_PHOTO'
    userPhoto: string | null
}

export type StateAuthObjectType = {
    auth: StateAuthType
}

export type StateAuthType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    smallPhoto: string | null
}


type ActionsAuthTypes = SetAuthUserDataACType
    | SetAuthUserPhotoACType

export type StateDataObjectType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const initialState: StateAuthType = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    smallPhoto: null,
}

export const authReducer = (state: StateAuthType = initialState, action: ActionsAuthTypes): StateAuthType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {...state, ...action.payload}
        case SET_AUTH_USER_PHOTO:
            return {...state, smallPhoto: action.userPhoto}
        default:
            return state;
    }
};

export const setAuthUserDataAC = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataACType => {
    return {type: SET_AUTH_USER_DATA, payload: {userId, login, email, isAuth}}
}
export const setAuthUserPhotoAC = (userPhoto: string | null): SetAuthUserPhotoACType => {
    return {type: SET_AUTH_USER_PHOTO, userPhoto}
}

export const getAuthUserData = () => (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const {id, login, email} = response.data.data
                dispatch(setAuthUserDataAC(id, login, email, true))
                return id
            }
        }).then(userId => {
            usersAPI.getProfileSmallPhoto(userId)
                .then(response => dispatch(setAuthUserPhotoAC(response.data.photos.small)))
    })
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
    })
}

export const logout = () => (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        })
}