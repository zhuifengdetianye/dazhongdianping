import * as actionTypes from '../constants/userstore'

const initalState = []
export default function userstore(state = initalState, action){
    switch(action.type){
        case actionTypes.USERSTORE_UPDATE:
            return action.data
        case actionTypes.USERSTORE_ADD:
            return [action.data, ...state]
        case actionTypes.USERSTORE_RM:
            return state.filter((item, index)=>{
                return item.id !== action.data.id
            })
        default:
            return state
    }
}