import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class HomeHd extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const data = this.props.data
        return (
            <div id='home-ad'>
                <h2>超值特惠</h2>
                <ul className='ad-container clear-fix'>
                    {
                        data.map((item, index)=>{
                            return (
                                <li key={index} className='ad-item float-left'>
                                    <a title={item.title} href={item.link}>
                                        <image src={item.img}/>
                                    </a>   
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default HomeHd