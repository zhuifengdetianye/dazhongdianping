import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getCommentData} from '../../../fetch/detail/detail'
import CommentList from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class Comment extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            hasMore: true,
            isLoadingMore: false, //是正在加载还是加载完成
            page: 0
        }
    }
    render(){
        return (
            <div className='detail-comment-subpage'>
                <h2>用户点评</h2>
                {this.state.data.length
                ? <CommentList data={this.state.data}/>: ''}

                {this.state.hasMore
                ?<LoadMore isLoadingMore={this.state.isLoading} loadPageData={this.loadPageData.bind(this)}/>
                :''}
            </div>
        )
    }
    componentDidMount(){
        this.loadPageData()
    }

    loadPageData(){
        this.setState({
            isLoading: true
        })
        const id = this.props.id
        const comment = getCommentData(id);
        this.resultHandle(comment)
        this.setState({
            page: this.state.page + 1,
            isLoading: false
        })

    }

    //数据处理
    resultHandle(result){
        result.then(res=>{
            return res.json()
        }).then(json=>{
            if(json.data.length){
                const data = json.data
                const hasMore = json.hasMore
                this.setState({
                    data: this.state.data.concat(data),
                    hasMore: hasMore
                })
            }
        })
    }


}

export default Comment