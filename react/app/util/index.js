import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hot} from 'react-hot-loader'
import RouteMap from '../router/routerMap.js'
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore.js'
import '../static/css/common.css'
import '../static/css/font-awesome.min.css'
import { BrowserRouter as Router} from "react-router-dom";


const store = configureStore();
class App extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<Router>
			 <Provider store={store}>
			    <RouteMap />
			 </Provider>
			</Router>
		)	
	}
	
}
export default hot(module)(App); //热加载

ReactDOM.render(
		<App />,
		document.getElementById('root')
)
