import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from '../../components/HomeHeader'
import Categroy from '../../components/Category'
import {connect} from 'react-redux'
import Ad from './subpage/Ad'
import List from './subpage/List'

class Home extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Categroy/>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>
            </div>
        )
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
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)