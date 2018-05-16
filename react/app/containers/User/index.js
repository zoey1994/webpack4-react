import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import UserInfo from '../../components/Userinfo'
import OrderList from './subpage/OrderList'
class User extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	componentDidMount() {
		if(!this.props.userinfo.username){
			this.props.history.push('/login')
		}
	}
	render(){
		const cityName = this.props.userinfo.cityName;
		const userName = this.props.userinfo.username;

		return(
			<div>
			{
				userName
				?
				<div>
					<Header title = '用户主页' backRouter = '/' />
					<UserInfo cityName = {cityName} userName = {userName} />
					<OrderList userName = {userName} />
				</div>
				:''
			}		
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		userinfo:state.userinfo
	}
}
export default withRouter(connect(mapStateToProps,null)(User))