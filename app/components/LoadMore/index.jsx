import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return (
            <div className='load-more' ref='wrapper'>
                {this.props.isLoadingMore ? <span>正在加载...</span>:<span onClick={this.loadingMore.bind(this)}>加载更新</span>}
            </div>
        )
    }
    loadingMore(){
        this.props.loadPageData();
    }
    
    componentDidMount(){
        const loadingMore = this.props.loadPageData
        const wrapper = this.refs.wrapper
        let timeoutId

        function callback(){
            let top = wrapper.getBoundingClientRect().top;
            let windowHeight = window.screen.height
            if(top && top < windowHeight){
                loadingMore()
            }
        }
        window.addEventListener('scroll', function(){
            if(this.props.isLoadingMore){
                return;
            }
            if(timeoutId){
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        }.bind(this), false)
    }
}

export default LoadMore