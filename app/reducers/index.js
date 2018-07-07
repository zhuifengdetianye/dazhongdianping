import { combineReducers } from 'redux'

import userinfo from './userinfo'
import userstore from './userstore'

const rootReducer = combineReducers({
    userinfo,
    userstore
})

export default rootReducer