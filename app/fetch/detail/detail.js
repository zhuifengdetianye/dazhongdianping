import {get} from '../get'

export function getInfoData(id){
    const result = get('/api/detail/info/' + id)
    return result
}

export function getCommentData(id){
    const comment = get('/api/detail/comment/' + id)
    return comment
}