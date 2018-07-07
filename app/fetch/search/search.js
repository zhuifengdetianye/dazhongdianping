import {get} from '../get'

export function getListData(page, city, type, keyword){
    const keywordStr = keyword ? '/' + encodeURIComponent(keyword) : '/all'
    const result = get('/api/searchlist/' + page + '/' + encodeURIComponent(city) + '/' + type  + keywordStr)
    return result
}