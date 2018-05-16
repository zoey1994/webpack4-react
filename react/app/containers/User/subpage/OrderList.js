import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getOrderList,postComment} from '../../../fetch/user/orderlist.js'
import OrderListComponent from '../../../components/OrderList'
import './style.scss'
class OrderList extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			data:[]
		}
	}
	componentDidMount() {
		const userName = this.props.userName;
		this.loadOrderList(userName);
	}
	loadOrderList(userName){
		const result = getOrderList(userName);
		result.then((res)=>{
			return res.json()
		}).then((json)=>{
			const data = json;
			this.setState({
				data:data
			})
		})
	}
	submitComment(id,value,callback){
		const result = postComment(id,value);
		result.then(res=>{
			return res.json()
		}).then(json=>{
			if(json.errno === 0){
				//已经评价，修改状态
				callback()
			}
		})
	}
	render(){
		return(
			 <div className="order-list-container">
			 	<h2>您的订单</h2>
				{
					this.state.data.length
					?<OrderListComponent data = {this.state.data} submitComment = {this.submitComment.bind(this)} />
					:<div>加载中...</div>
				}
			</div>
		)
	}
}

export default OrderList