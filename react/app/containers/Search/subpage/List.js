import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {getSearchData} from '../../../fetch/search/search' 
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'


class List extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			data:[],
			hasMore:false,
			isLoadingMore:false,
			page:0
		}
	}
	componentDidMount() {
		this.loadFirstPage();
	}
	loadFirstPage(){
		const cityName = this.props.userinfo.cityName;

		const page = this.state.page;
		const keyword = this.props.keyword || '';
		const category = this.props.category;

		//向后台获取结果
		const result = getSearchData(page,cityName,category,keyword);	
		this.resultHandle(result);	
	}
	resultHandle(result){
		const page = this.state.page;
		this.setState({
			page:page+1
		});
		result.then(res => {
			return res.json()
		}).then(json =>{

			const hasMore = json.hasMore;
			const data = json.data;

			this.setState({
				hasMore:hasMore,
				data:this.state.data.concat(data)
			})
		})
	}
	loadMoreData(){
		this.setState({
			isLoadingMore:true,
		})
		const cityName = this.props.userinfo.cityName;
		const page = this.state.page;
		const keyword = this.props.keyword || '';
		const category = this.props.category;

		const result = getSearchData(page,cityName,category,keyword);
		this.resultHandle(result);
		this.setState(({
			isLoadingMore:false
		}))

	}
	render(){
		return(
			<div>
				{
					this.state.data.length
					? <ListComponent data = {this.state.data} />
					: <div>加载中...</div>
				}
				{
					this.state.hasMore
					?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
					:''
				}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		userinfo:state.userinfo
	}
}
export default connect(mapStateToProps,null)(List)