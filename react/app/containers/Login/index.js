import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userInfoActionsFormOtherFile from '../../actions/userinfo.js'
import LoginForm from '../../components/LoginForm'
import {withRouter} from 'react-router-dom'
class Login extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			isChecking:false
		}
	}
	componentDidMount() {
		let userinfo = this.props.userinfo;
		if(userinfo.username){
			//跳转到用户中心页面
			this.props.history.push('/User');
		}else{
			this.setState({
				isChecking:true
			})
		}
	}
	loginHandle(username){
		//保存用户名
		let userinfo = this.props.userinfo;
		const userLogin = this.props.userLogin;
		userLogin.update({
			cityName:userinfo.cityName,
			username:username
		});
		
		//登录之后的页面跳转
		if(this.props.match.params.router){
			
			const router = decodeURIComponent(this.props.match.params.router);
			this.props.history.push('/'+router);
		}else{
			this.props.history.push('/User');
		}
	}
	render(){

		return(
			<div>
				<Header title='登录' />
				{
					this.state.isChecking
					?<LoginForm loginHandle = {this.loginHandle.bind(this)} />
					:<div></div>
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
function mapDispatchToProps(dispatch){
	return{
		userLogin:bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)