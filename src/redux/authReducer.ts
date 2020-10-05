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
    data: StateDataObjectType
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

type StateDataObjectType = {
    userId: number | null
    login: string | null
    email: string | null
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
            return {...state, ...action.data, isAuth: true}
        case SET_AUTH_USER_PHOTO:
            return {...state, smallPhoto: action.userPhoto}
        default:
            return state;
    }
};

export const setAuthUserDataAC = (userId: number|null, login: string|null,
                                  email: string|null): SetAuthUserDataACType => {
    return {type: SET_AUTH_USER_DATA, data: {userId, login, email}}
}

export const setAuthUserPhotoAC = (userPhoto: string | null): SetAuthUserPhotoACType => {
    return {type: SET_AUTH_USER_PHOTO, userPhoto}
}
