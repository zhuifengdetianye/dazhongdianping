import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item'

import './style.less'

class BuyList extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return (
            <div>
                {this.props.orderList.map((item, index)=>{
                    return <Item commitComment={this.props.commitComment} info={item} key={index}/>
                })}
            </div>
        )
    }
}

export default BuyList