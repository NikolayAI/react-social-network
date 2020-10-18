import {authAPI, usersAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type SetAppInitializedSuccessACType = {
    type: 'INITIALIZED_SUCCESS'
}

export type StateAppObjectType = {
    app: StateAppType
}

export type StateAppType = {
    initialized: boolean
}

type ActionsAppTypes = SetAppInitializedSuccessACType

const initialState: StateAppType = {
    initialized: false,
}

export const appReducer = (state: StateAppType = initialState, action: ActionsAppTypes): StateAppType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state;
    }
};

export const setAppInitializedSuccessAC = (): SetAppInitializedSuccessACType => ({type: INITIALIZED_SUCCESS})

export const initialize = () => (dispatch: ThunkDispatch<StateAppType, {}, ActionsAppTypes>) => {
    Promise.all([dispatch(getAuthUserData())])
        .then(() => dispatch(setAppInitializedSuccessAC()))
}