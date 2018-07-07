import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getOrderListData, postCommentData} from '../../../fetch/user/user'
import BuyListComponent from '../../../components/BuyList'

import './style.less'

class BuyList extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            orderList:[]
        }
    }
    render(){
        return (
            <div className='order-list-container'>
                <h2>您的订单</h2>
                {this.state.orderList.length
                ? <BuyListComponent commitComment={this.commitComment.bind(this)} orderList={this.state.orderList}/>
                : ''}
            </div>
        )
    }

    componentDidMount(){
        const username = this.props.userinfo.username
        if(username){
            this.loadOrderList()
        }
    }

    //处理数据
    loadOrderList(){
        const orderList = getOrderListData()
        orderList.then(res=>{
            return res.json()
        }).then(json=>{
            this.setState({
                orderList: json
            })
            console.log(json)
        })
    }

    //提交数据
    commitComment(id, comment, callback){
        const result = postCommentData(id, comment);
        result.then(res=>{
            return res.json()
        }).then(json=>{
            if(json.errno == 0){
                callback()
            }
        })
    }
}

export default BuyList