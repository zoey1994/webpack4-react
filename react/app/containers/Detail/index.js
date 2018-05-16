import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import Info from './subpage/info'
import Comment from './subpage/comment'
import Buy from './subpage/buy'

class Detail extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render(){
		return(
			<div>
				<Header title = '商品详情' />
				<Info id = {this.props.match.params.id} />
				<Buy id = {this.props.match.params.id} />
				<div style={{height:'15px',background:'#eee'}}></div>
				<Comment id = {this.props.match.params.id} />
			</div>
		)
	}
}

export default Detail