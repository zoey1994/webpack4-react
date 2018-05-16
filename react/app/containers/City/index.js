import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { CITYNAME } from '../../config/localStoreKey'
import * as userInfoActionsFormOtherFile from '../../actions/userinfo.js'
import {withRouter} from 'react-router-dom'
import localStore from '../../util/localStore'

class City extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
    changeCity(newCity) {
        if (newCity == null) {
            return
        }
        // 修改 redux
        const userinfo = this.props.userinfo;
        userinfo.cityName = newCity;  
        this.props.userInfoActions.update({
        	cityName:newCity
        });

        // 修改 cookie
        localStore.setItem(CITYNAME, newCity);

        //跳转
        this.props.history.goBack()
    }	
	render(){
		return(
			<div>
				<Header title="选择城市" />
				<CurrentCity cityName={this.props.userinfo.cityName} />
				<CityList userInfoChange = {this.changeCity.bind(this)}/>
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
		userInfoActions:bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(City))