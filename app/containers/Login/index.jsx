import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import {hashHistory} from 'react-router'
import Header from '../../components/Header'
import LoginComponent from '../../components/Login'

class Login extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            checking: true
        }
    }
    render(){
        return (
            <div>
                <Header title='登录'/>
                {
                    this.state.checking
                    ? <div>{/*登录中*/}</div>
                    : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
                
            </div>
        )
    }
    componentDidMount(){
        //判断是否已经登录
        this.doCheck();
    }
    doCheck(){
        //验证用户存在与否
        const userinfo = this.props.userinfo
        if(userinfo.username){
            this.goUserPage()
        }else{
            this.setState({
                checking: false
            })
        }
    }
    //处理登录之后的事
    loginHandle(username){
        //保存用户名
        const userinfo = this.props.userinfo
        const actions = this.props.userInfoActions
        userinfo.username = username
        actions.update(userinfo)

        //跳转
        const params = this.props.params
        const router = params.router
        if(router){
            hashHistory.push(router)
        }else{
            this.goUserPage()
        }
    }

    goUserPage(){
        hashHistory.push('/user')
    }
}

//redux react 绑定
function mapStateToProps(state){
    return{
        //把状态state更新到视图层
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return{
        //把action绑定到视图层，触发action的时候执行相应的action，并传入相应的状态state
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)