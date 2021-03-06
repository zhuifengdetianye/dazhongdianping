import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'
import List from './subpage/List'

class Search extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const params = this.props.params
        return (
            <div>
                <SearchHeader keyword={params.keyword || ''}/>
                <List keyword={params.keyword || ''} type={params.type}/>
            </div>
        )
    }
    componentDidMount(){
        
    }
}
export default Search