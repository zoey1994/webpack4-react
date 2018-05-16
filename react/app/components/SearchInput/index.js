import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.scss'

class SearchInput extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			value:''
		}
	}
	componentDidMount(){
		this.setState({
			value:this.props.value || ''
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			value:nextProps.value || ''
		})
	}
	ChangeHandle(e){
		this.setState({
			value:e.target.value
		})
	}
	KeyUpHandle(e){
		if(e.keyCode !== 13){
			return
		}
		this.props.enterHandle(this.state.value)

	}
	render(){
		return(
			<input className="search-input" type="text" placeholder="请输入关键字" value={this.state.value} 
						onChange={this.ChangeHandle.bind(this)} onKeyUp={this.KeyUpHandle.bind(this)} />
		)
	}
}

export default SearchInput