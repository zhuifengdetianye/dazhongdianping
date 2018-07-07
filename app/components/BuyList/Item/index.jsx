import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class Item extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            commentState: 0
        }
    }
    render(){
        const data = this.props.info
        return (
            <div className="order-item-container">
                <div className="clear-fix order-item-container">
                    <div className="order-item-img float-left">
                        <img src={data.img}/>
                    </div>
                    <div className="order-item-comment float-right">
                    {
                        this.state.commentState === 0
                        ? <button className="btn" onClick={this.commentClickHanle.bind(this)}>评价</button>
                        : this.state.commentState === 2
                        ? <button className="btn unseleted-btn">已评价</button>
                        : ''
                    }
                    </div>
                    <div className="order-item-content">
                        <span>商户：{data.title}</span>
                        <span>数量：{data.count}</span>
                        <span>价格：￥{data.price}</span>
                    </div>
                </div>
                
                {
                    this.state.commentState === 1
                    ? <div className="comment-text-container">
                        <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref='commentValues'></textarea>
                        <button className="btn" onClick={this.submitClickHandle.bind(this)}>提交</button>
                        &nbsp;
                        <button className="btn unseleted-btn" onClick={this.cancleClickHandle.bind(this)}>取消</button>
                      </div>
                    : ''
                }
                
            </div>
        )
    }
    componentDidMount(){
        const data = this.props.info
        this.setState({
            commentState: data.commentState
        }) 
    }
    commentClickHanle(){
        this.setState({
            commentState: 1
        })
    }
    cancleClickHandle(){
        this.setState({
            commentState: 0
        })
    }
    submitClickHandle(){
        //获取textarea的DOM
        const textarea = this.refs.commentValues;
        const comment = textarea.value.trim();
        const id = this.props.info.id;
        if(!comment){
            return
        }
        this.props.commitComment(id, comment, function(){
            this.setState({
                commentState: 2
            })
        }.bind(this))
    }
}

export default Item