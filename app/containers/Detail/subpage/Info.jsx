import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DetailInfo from '../../../components/DetailInfo'
import {getInfoData} from '../../../fetch/detail/detail'

import './style.less'

class Info extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: false
        }
    }
    render(){
        return (
            <div>
                {this.state.data ? <DetailInfo info={this.state.data}/>:''}
            </div>
        )
    }
    componentDidMount(){
        const id = this.props.id
        const info = getInfoData(id);
        info.then(res=>{
            return res.json()
        }).then(json=>{
            this.setState({
                data: json
            })
        })

    }

}

export default Info