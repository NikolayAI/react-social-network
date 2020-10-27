import {ThunkDispatch} from "redux-thunk";
import {getAuthUserData} from "./authReducer";

const initialState = {
    initialized: false as boolean,
}

export type StateAppObjectType = {
    app: StateAppType
}
export type StateAppType = typeof initialState

export const appReducer = (state= initialState, action: ActionsAppTypes): StateAppType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state;
    }
};

const INITIALIZED_SUCCESS = 'social_network/app/INITIALIZED_SUCCESS'

export type SetAppInitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

type ActionsAppTypes = SetAppInitializedSuccessActionType

export const setAppInitializedSuccessAC = (): SetAppInitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initialize = () => (dispatch: ThunkDispatch<StateAppType, {}, ActionsAppTypes>) => {
    Promise.all([dispatch(getAuthUserData())])
        .then(() => dispatch(setAppInitializedSuccessAC()))
}

// export type StateAppType = {
//     initialized: boolean
// }