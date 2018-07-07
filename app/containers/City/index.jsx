import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import LocalStore from '../../util/localStore'
import {CITYNAME} from '../../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'


class City extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return (
            <div>
                <Header title='当前位置'/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList updateCity={this.updateCity.bind(this)}/>
            </div>
        )
    }
    updateCity(newCity){
        if(newCity == null){
            return
        }
        //修改redux
        const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo)

        //修改localstorage
        localStorage.setItem(CITYNAME, newCity)

        //跳转页面
        hashHistory.push('/')
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
)(City)