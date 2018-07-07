import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from '../../../fetch/search/search'
import ListShow from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import {connect} from 'react-redux'

const initState = {
    data: [],
    hasMore: true,
    isLoadingMore: false, //是正在加载还是加载完成
    page: 0
}
class List extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initState
    }
    render(){
        return (
            <div>
                {
                    this.state.data.length
                    ?<ListShow data={this.state.data}/>
                    :<div>not found</div>
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
        const city = this.props.userinfo.cityName
        const type = this.props.type
        const keyword = this.props.keyword || ''

        const result = getListData(page, city, type, keyword);
        console.log(result)
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

    //处理重新搜索
    componentDidUpdate(prevProps, prevState){
        const keyword = this.props.keyword
        const type = this.props.type
        if(keyword == prevProps.keyword && type == prevProps.type){
            return
        }

        //重置state
        this.setState(initState)

        //获取首页数据
        this.loadPageData()   
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
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)