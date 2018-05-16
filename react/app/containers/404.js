import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
class NotFound extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<h3>404 not Found</h3>
		)
	}
}

export default NotFound