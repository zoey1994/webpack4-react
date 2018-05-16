import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from '../../../fetch/home/home.js'
import './style.scss'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
class List extends Component{
	constructor(props){
		super(props);
		this.state={
			data:[],  //存储列表信息
			hasMore:false, //记录当前状态下，还有没有更多的数据可供加载
			isLoadingMore:false, //记录当前状态下，是“加载中...”还是“点击加载更多”
			page:1  //下一页页码
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	componentDidMount() {
		//获取第一页数据
		this.loadFirstPageData();
		
	}
	//获取首屏数据
	loadFirstPageData(){
		const cityName = this.props.cityName;
		const result = getListData(cityName,0);
		this.resultHandle(result);
	}
	//加载更多数据
	loadMoreData(){
		//记录状态
		this.setState({
			isLoadingMore:true          //loadmore组件显示正在加载数据
		})
		const cityName = this.props.cityName;
		const page = this.state.page;
		const result = getListData(cityName,page);
		this.resultHandle(result);
		this.setState({
			page:page+1,
			isLoadingMore:false       //数据加载完毕，loadmore组件显示加载更多
		})
	}
	resultHandle(result){
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json.data;
			const hasMore = json.hasMore;
			this.setState({
				data:this.state.data.concat(data),    //将加载的数据拼接进去
				hasMore:hasMore
			})
		})
	}
	render(){
		return(
			<div>
				<h2 className="home-list-title">猜你喜欢</h2>
				{this.state.data.length
					?<ListComponent data={this.state.data}/>
					:<div>加载中...</div>
				}
				{
					this.state.hasMore
					? <LoadMore isLoadingMore = {this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
					:''
				}
			</div>
		)
	}
}

export default List