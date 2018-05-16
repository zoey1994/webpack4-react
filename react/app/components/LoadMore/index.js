import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.scss'

class LoadMore extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	loadMoreHandle(){
		this.props.loadMoreFn();  
	}
	componentDidMount() {
		const loadMoreFn =  this.props.loadMoreFn;
		const wrapper = this.refs.wrapper;
		let timeoutId;   //节流
		function callback(){
			const top = wrapper.getBoundingClientRect().top;
			const windowHeight = window.screen.height;
			if(top && top<windowHeight){
				loadMoreFn();
			}
		}
		window.onscroll = (function(){
			if(this.props.isLoadingMore){
				return
			}
			if(timeoutId){
				clearTimeout(timeoutId)
			}
			timeoutId = setTimeout(callback,50)
		}.bind(this))
	}
	render(){
		return(
			<div className="load-more" ref = "wrapper">
				{	this.props.isLoadingMore
					?<span>加载中...</span>
					:<span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
				}
			</div>
		)
	}
}

export default LoadMore