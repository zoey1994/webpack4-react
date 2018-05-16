import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader' 
import List from './subpage/List'
class Search extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render(){

		return(
			<div>
				<SearchHeader keyword={this.props.match.params.key} />
				<List keyword={this.props.match.params.key} category={this.props.match.params.category} />
			</div>
		)
	}
}

export default Search