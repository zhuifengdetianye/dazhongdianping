import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'

class SearchInput extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: this.props.value || ''
        }
    }

    render(){
        return (
            <input 
            type='text' 
            className='search-input' 
            placeholder='请输入关键字' 
            onChange={this.changeHandle.bind(this)}
            onKeyUp={this.keyUpHandle.bind(this)}
            value={this.state.value}/>
        )
    }

    componentDidMout(){    
        //每次加载初始化state
       
    }

    changeHandle(e){
        //更新state
        this.setState({
            value: e.target.value
        })
    }

    keyUpHandle(e){
        const value = this.state.value
        //是否是enter
        if(e.keyCode !== 13){
            return
        }
        this.props.enterHandle(value)
    }
}

export default SearchInput