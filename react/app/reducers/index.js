import {combineReducers} from 'redux'

import userinfo from './userinfo'
import store from './store'

const rootReducer = combineReducers({
	userinfo:userinfo,
	store:store
})
export default rootReducer