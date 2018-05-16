import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getComment} from '../../../fetch//detail/detail.js'
import DetailComment from '../../../components/DetailComment'
import LoadMore from '../../../components/LoadMore'
class Comment extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			data:[],
			hasMore:false,
			isLoadMore:false,
			page:0
		}
	}
	componentDidMount() {
		//获取第一页评论
		const id = this.props.id;
		const page = this.state.page;
		this.loadFirstPage(id,page);
	}
	loadFirstPage(id,page){
		const result = getComment(id,page);
		this.getCommentResult(result);
	}
	getCommentResult(result){
		result.then((res)=>{
			return res.json()
		}).then((json)=>{

			const data = json.data;
			const hasMore = json.hasMore;
			const page = this.state.page+1;
			this.setState({
				data:this.state.data.concat(data),
				hasMore:hasMore,
				page:page
			})
		})
	}
	loadMoreData(){
		this.setState({
			isLoadMore:true
		})
		const id = this.props.id;
		const page = this.props.page;
		const result = getComment(id,page);
		this.getCommentResult(result);
		this.setState({
			isLoadMore:false
		})
	}
	render(){

		return(
			<div>

				{
					this.state.data.length
					?<DetailComment data = {this.state.data} />:<div>加载中</div>
				}
				{
					this.state.hasMore
					?<LoadMore isLoadMore = {this.state.isLoadMore} loadMoreFn={this.loadMoreData.bind(this)}/>
					:''
				}
			</div>
		)
	}
}

export default Comment