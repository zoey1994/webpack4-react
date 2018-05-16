import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import "./style.scss"

class Header extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	clickHandle(){
		const backRouter = this.props.backRouter;
		if(backRouter){
			this.props.history.push(backRouter)
		}else{
			this.props.history.goBack()
		}
		
	}
	render(){
		return(
			<div id="common-header">
				 <span className="back-icon" onClick={this.clickHandle.bind(this)}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
				<h1>{this.props.title}</h1>
			</div>
		)
	}
}



export default withRouter(Header)