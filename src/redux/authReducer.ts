const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'


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
    data: StateAuthType
}

export type StateAuthObjectType = {
    auth: StateAuthType
}

export type StateAuthType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}


type ActionsAuthTypes = SetAuthUserDataACType

const initialState: StateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: StateAuthType = initialState, action: ActionsAuthTypes): StateAuthType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {...state, ...action.data, isAuth: true}
        default:
            return state;
    }
};

export const setAuthUserDataAC = (data: StateAuthType): SetAuthUserDataACType => ({type: SET_AUTH_USER_DATA, data})
