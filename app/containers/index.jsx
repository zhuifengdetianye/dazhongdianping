import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import LocalStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

class App extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }  
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone
                    ? this.props.children
                    : <div>正在加载...</div>
                }
            </div>
        )
    }
    componentDidMount(){
        let cityName = LocalStore.getItem(CITYNAME)
        if(cityName == null){
            cityName = '北京'
        }
        this.props.userInfoActions.update({
            cityName: cityName
        })

        //更新状态
        this.setState({
            initDone: true
        })
    }
}

//redux react 绑定
function mapStateToProps(state){
    return{
        //把状态state更新到视图层
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
)(App)