import { getAuthUserData } from './authReducer'
import { BaseThunkType, InferActionsTypes } from './rootReducer1'
import { Dispatch } from 'redux'

const initialState = {
  initialized: false,
}

export const appReducer = (
  state = initialState,
  action: ActionsAppTypes
): StateAppType => {
  switch (action.type) {
    case 's_n/app/INITIALIZED_SUCCESS':
      return { ...state, initialized: true }
    default:
      return state
  }
}

const appActions = {
  setAppInitializedSuccess: () =>
    ({ type: 's_n/app/INITIALIZED_SUCCESS' } as const),
}

export const initialize = () => async (dispatch: Dispatch<any>) => {
  await Promise.all([dispatch(getAuthUserData())])
  dispatch(appActions.setAppInitializedSuccess())
}

export type StateAppObjectType = {
  app: StateAppType
}
export type StateAppType = typeof initialState
type ActionsAppTypes = InferActionsTypes<typeof appActions>
