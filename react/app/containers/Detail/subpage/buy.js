import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BuyAndStore from '../../../components/BuyAndStore'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import * as storeActionsFromFile from '../../../actions/store'

class Buy extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			isStore:false
		}
	}
	componentDidMount() {
        this.checkStoreState()
    }
    checkStoreState(){
    	const id = this.props.id
        const store = this.props.store
         // some 即任何一个满足即可
         if(store){
	         store.some(item => {
	            if (item.id === id) {
	                // 已经被收藏
	                this.setState({
	                    isStore: true
	                })
	                // 跳出循环
	                return true
	            }
	        })        	
         }

    }
	buyHandle(){
		const loginCheck = this.loginCheck();
		if(!loginCheck){
			return
		}		
		//省去复杂的模拟购买过程，假设完成后买后直接跳转到用户主页
		this.props.history.push('/User')
	}
	storeHandle(){
		//如果用户已经登录
		const loginCheck = this.loginCheck();
		if(!loginCheck){
			return
		}

		const id = this.props.id;
		const isStore = this.state.isStore;
		const storeActions = this.props.storeActions;
		// console.log(this.props.store)
		if(this.state.isStore){
			storeActions.rm({id:id})
		}else{
			storeActions.add({id:id})
		}
		this.setState({
				isStore:!isStore
		});
		
	}
	loginCheck(){
		const id = this.props.id;
		if(this.props.userinfo.username){
			return true
		}else{
			this.props.history.push('/login/'+encodeURIComponent('detail/'+id));
			return false
		}
	}
	render(){
		return(
				<BuyAndStore isStore = {this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)} />
		)
	}
}

function mapStateToProps(state){
	return{
		userinfo:state.userinfo,
		store:state.store
	}
}
function mapDispatchToProps(dispatch){
	return{
		storeActions:bindActionCreators(storeActionsFromFile,dispatch)
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Buy))