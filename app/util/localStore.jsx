export default {
    getItem: function(key){
        let value
        try{
            value = localStorage.getItem(key)
        }catch(ex){
            if(__DEV__){
                console.error('localStorage.getItem报错', ex.message)
            }
        }finally{
            return value
        }
    },
    setItem: function(key){
        try{
            //ios safari无痕模式下，直接使用laocalStorage.setItem会报错
            localStorage.setItem(key,value)
        }catch(ex){
            //如果开发环境下提示error
            if(__DEV__){
                console.error('localStorage.setItem报错', ex.message)
            }
        }
    }
}