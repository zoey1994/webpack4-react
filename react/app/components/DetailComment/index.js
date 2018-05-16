import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CommentItem from './Item'
class DetailComment extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
 	render() {
        // 获取数据
        const data = this.props.data;
        return (
            <div className="comment-list">
                {data.map((item, index) => {
                    return <CommentItem key={index} data={item} />
                })}
            </div>
        )
    }
}

export default DetailComment