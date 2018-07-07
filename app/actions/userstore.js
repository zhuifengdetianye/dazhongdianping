import * as actionTypes from '../constants/userstore'

export function update(data){
    return {
        type: actionTypes.USERSTORE_UPDATE,
        data
    }
}

export function add(data){
    return {
        type: actionTypes.USERSTORE_ADD,
        data
    }
}

export function rm(data){
    return {
        type: actionTypes.USERSTORE_RM,
        data
    }
}