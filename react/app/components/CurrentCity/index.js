import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import "./style.scss"

class CurrentCity extends Component{
	constructor(props){
		super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	clickHandle(){

	}
    render() {
        return (
            <div id="current-city">
                <h2>{this.props.cityName}</h2>
            </div>
        )
    }
}



export default CurrentCity