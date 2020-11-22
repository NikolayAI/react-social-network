import {getAuthUserData} from "./authReducer"
import {BaseThunkType, InferActionsTypes} from "./reduxStore"


const initialState = {
    initialized: false,
}


export const appReducer = (state = initialState, action: ActionsAppTypes): StateAppType => {
    switch (action.type) {
        case 's_n/app/INITIALIZED_SUCCESS':
            return {...state, initialized: true}
        default:
            return state
    }
}


const appActions = {
    setAppInitializedSuccessAC: () => ({type: 's_n/app/INITIALIZED_SUCCESS'} as const),
}


export const initialize = () => (dispatch: any) => {
    Promise.all([dispatch(getAuthUserData())])
        .then(() => dispatch(appActions.setAppInitializedSuccessAC()))
}


export type StateAppObjectType = {
    app: StateAppType
}
export type StateAppType = typeof initialState
type ActionsAppTypes = InferActionsTypes<typeof appActions>
type AuthThunkType = BaseThunkType<ActionsAppTypes>