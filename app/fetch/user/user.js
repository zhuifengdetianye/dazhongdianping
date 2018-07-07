import {get} from '../get'
import {post} from '../post'

export function getOrderListData(){
    const result = get('/api/user/orderlist')
    return result
}

export function postCommentData(id, comment){
    const result = post('/api/submitcomment', {
        id: id,
        comment: comment
    })
    return result
}