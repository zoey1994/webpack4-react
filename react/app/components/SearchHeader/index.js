import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchInput from '../SearchInput'
import './style.scss'

class SearchHeader extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	clickHandle(){
		this.props.history.goBack();   //这里返回之后input框里的value值没有改变为上一次搜索结果
	}
	enterHandle(value){
		this.props.history.push('/search/all/'+encodeURIComponent(value));
	}
	render(){
		return(			
			<div id="search-header" className="clear-fix">
				 <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
                <div className="input-container">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    &nbsp;
                    <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)} />
                </div>
			</div>
		)
	}
}

export default withRouter(SearchHeader)