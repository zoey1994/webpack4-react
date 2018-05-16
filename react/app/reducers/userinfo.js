import * as actionTypes from '../constants/userinfo'

const initialState={}

export default function userinfo(state=initialState,action){
	switch(action.type){
		//更新城市信息
		case actionTypes.USERINFO_UPDATE:
			return action.data
		default:
			return state
	}
}