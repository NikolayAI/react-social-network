import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './reducers/reduxStore'
import { useEffect } from 'react'
import { initialize } from './reducers/appReducer'

export const useAppInitialize = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<RootStateType, boolean>(
        (state) => state.app.initialized
    )

    const catchAllUnhandledErrors = (
        promiseRejectionEvent: PromiseRejectionEvent
    ) => {
        alert('some error occurred')
        console.log(promiseRejectionEvent)
    }

    useEffect(() => {
        dispatch(initialize())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
        return () => {
            window.removeEventListener(
                'unhandledrejection',
                catchAllUnhandledErrors
            )
        }
    }, [dispatch])

    return initialized
}
