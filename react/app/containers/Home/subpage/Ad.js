import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getAdData} from '../../../fetch/home/home.js'
import HomeAd from '../../../components/HomeAd'

class Ad extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:[]
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	componentDidMount() {
		const result = getAdData();
		result.then((res)=>{
			return res.json();
		}).then((json)=>{
			const data = json;
			if(data.length){
				this.setState({
					data:data
				})
			}
		})
	}
	render(){
		return(
			<div>
				{	
					this.state.data.length 
					? <HomeAd data = {this.state.data} /> 
					: <div>{}</div>
				}
			</div>
		)
	}
}

export default Ad