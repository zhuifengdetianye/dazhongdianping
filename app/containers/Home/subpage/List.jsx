import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from '../../../fetch/home/home'
import ListShow from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class List extends React.Component {
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
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>

                {
                    this.state.data.length
                    ?<ListShow data={this.state.data}/>
                    :<div></div>
                }

                {
                    this.state.hasMore
                    ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadPageData={this.loadPageData.bind(this)}/>
                    :''
                }

            </div>
        )
    }
    componentDidMount(){
        //获取首页数据
        this.loadPageData()
    }
    
    loadPageData(){
        this.setState({
            isLoadingMore:true
        })

        const page = this.state.page
        const city = this.props.cityName
        const result = getListData(city, page);
        this.resultHandle(result)
        this.setState({
            page: this.state.page + 1,
            isLoadingMore: false
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

export default List