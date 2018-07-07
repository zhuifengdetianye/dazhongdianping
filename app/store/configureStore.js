import {createStore} from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initalState){
    const store = createStore(rootReducer, initalState,
        //触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined 
    )
    return store
}