import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore.js'
import {CITYNAME} from '../config/localStoreKey.js'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFormOtherFile from '../actions/userinfo.js'


class App extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		//从localstorage里面获取城市
		let cityName = LocalStore.getItem(CITYNAME);
		if(cityName==null){
			cityName='北京'
		}

		//将城市信息和用户登录状态存储到redux中
		this.props.userInfoActions.update({
			cityName:cityName
		})
	}
	render(){
		return(
			<div>
			 {this.props.children}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{

	}
}
function mapDispatchToProps(dispatch){
	return{
		userInfoActions:bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(App)