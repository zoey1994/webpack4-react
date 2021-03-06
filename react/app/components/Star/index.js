import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'

class Star extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 获取 star 数量，并取余5（最多5个star）
        let star = this.props.star || 0
        if (star > 5) {
            star = star % 5
        }

        return (
            <div className="star-container">
                {[1, 2, 3, 4, 5].map((item, index) => {
                    const lightClass = star >= item ? '-o' : ''
                    return <i key={index} className={'fa fa-star' + lightClass}></i>
                })}
            </div>
        )
    }
}

export default Star