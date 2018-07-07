import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import BuyOrSaveComponent from '../../../components/BuyOrSave'
import * as userStoreActionsFromOtherFile from '../../../actions/userstore'
import * as userInfoActionsFromOtherFile from '../../../actions/userinfo'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'

class BuyOrSave extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }
    }
    render(){
        return (
            <div>
                <BuyOrSaveComponent 
                isStore={this.state.isStore} 
                storeHandle={this.storeHandle.bind(this)} 
                buyHandle={this.buyHandle.bind(this)}/>
            </div>
        )
    }
    componentDidMount(){
        //验证商户是否收藏
        this.isStore(this.props.id)
    }
    loadCheck(){
        const userinfo = this.props.userinfo
        const username = userinfo.username
        const id = this.props.id
        //检查用户是否存在
        if(!username){
            hashHistory.push('/login/'+ encodeURIComponent('/detail/'+ id))
            return false
        }
        return true
    }

    //购买函数
    buyHandle(){
        //验证登录
        const isLoad = this.loadCheck()
        if(!isLoad){
            return
        }
        //购买
        //跳到用户页
        hashHistory.push('/user')
    }

    //收藏函数
    storeHandle(){
        //验证登录
        const isLoad = this.loadCheck()
        if(!isLoad){
            return
        }
        const id = this.props.id
        const actions = this.props.userStoreActions
        const userstore = this.props.userstore
        if(this.isStore(id)){
            //取消收藏
            actions.rm({id:id})
        }else{
            //收藏
            actions.add({id:id})
        }
        this.setState({
            isStore: !this.state.isStore
        })
    }

    isStore(id){
        const userstore = this.props.userstore
        //遍历是否已收藏
        const isStore = userstore.some((item, index)=>{
            return id == item.id
        })
        if(isStore){
            this.setState({
                isStore: true
            })
        }
        return isStore
    }


}

//redux react 绑定
function mapStateToProps(state){
    return{
        //把状态state更新到视图层
        userinfo: state.userinfo,
        userstore: state.userstore
    }
}
function mapDispatchToProps(dispatch){
    return{
        //把action绑定到视图层，触发action的时候执行相应的action，并传入相应的状态state
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
        userStoreActions: bindActionCreators(userStoreActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyOrSave)