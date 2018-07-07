import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item'

import './style.less'

class CommentList extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const data = this.props.data
        console.log(data)
        return (
            <ul className="comment-list">
            {data.map((item, index)=>{
                return <Item key={index} data={item}/>
            })}
            </ul>
            
        )
    }
}

export default CommentList