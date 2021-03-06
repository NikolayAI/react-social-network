import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from '../redux/reducers/rootReducer1'

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        //@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
