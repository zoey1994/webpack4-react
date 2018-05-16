import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.scss'
class UserInfo extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
       return (
            <div className="userinfo-container">
                <p>
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    &nbsp;
                    <span>{this.props.userName}</span>
                </p>

                <p>
                    <i className="fa fa-map-marker" aria-hidden="true"></i> 
                    &nbsp;
                    <span>{this.props.cityName}</span>
                </p>
            </div>
        )
	}
}

export default UserInfo