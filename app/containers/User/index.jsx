import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import UserInfo from '../../components/UserInfo'
import BuyList from './subpage/BuyList'

class User extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isLoad: false
        }
    }
    render(){
        return (
            <div>
                <Header title='用户中心' backrouter='/'/>
                <UserInfo userinfo={this.props.userinfo}/>
                <BuyList userinfo={this.props.userinfo}/>
            </div>
        )
    }
    componentDidMount(){
        this.checkLoad()
    }

    //判断用户是否登录
    checkLoad(){
        const username = this.props.userinfo.username
        if(username){
            this.setState({
                isLoad: true
            })
        }else{
            hashHistory.push('/login')
        }
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
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)