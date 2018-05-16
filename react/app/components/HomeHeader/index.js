import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchInput from '../SearchInput'
import './style.scss'

class HomeHeader extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	enterHandle(value){
		this.props.history.push('/search/all/'+encodeURIComponent(value))
	}
	render(){
		return(
			<div id="home-header" className="clear-fix">
				<div className="home-header-left float-left">
					<Link to="/city">
						<span>{this.props.cityName}</span>
						&nbsp;
						<i className="fa fa-angle-down" aria-hidden="true"></i>
					</Link>
				</div>
				<div className="home-header-right float-right">
					<Link to="/login">
						<i className="fa fa-user" aria-hidden="true"></i>
					</Link>
				</div>
				<div className="home-header-middle">
					<div className="search-container">
						<i className="fa fa-search" aria-hidden="true"></i>
						<SearchInput value="" enterHandle={this.enterHandle.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(HomeHeader)