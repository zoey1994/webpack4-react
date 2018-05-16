import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getInfo} from '../../../fetch/detail/detail'
import DetailInfo from '../../../components/DetailInfo'
class Info extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			data:false,
		}
	}
	componentDidMount() {
		//获取商品信息
		const id = this.props.id
		const result = getInfo(id);
		this.getInfoData(result);
	}
	getInfoData(result){
		result.then((res) =>{
			return res.json()
		}).then((json) =>{
			const data = json;
			this.setState({
				data:data
			})
		})
	}
	render(){
		return(
			<div>
				{	this.state.data
					?<DetailInfo data = {this.state.data} />
					:<div>加载中</div>
				}
			</div>
		)
	}
}

export default Info