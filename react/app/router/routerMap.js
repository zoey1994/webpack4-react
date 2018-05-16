import React,{Component} from 'react'
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
//https://blog.csdn.net/macleer/article/details/78591842
import App from '../containers'
import Home from '../containers/Home'
import City from '../containers/City'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import NotFound from '../containers/404.js'
import Login from '../containers/Login'
import User from '../containers/User'

class RouteMap extends Component{
	render(){
		return(
				<App>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/city' component={City} />
						<Route path='/search/:category/:key?' component={Search} />
						<Route path='/detail/:id' component={Detail} />
						<Route path='/login/:router?' component={Login} />
						<Route path='/User' component={User} />
						<Route component={NotFound} />
					</Switch>
				</App>
		)
	}
}

export default RouteMap