import * as actionTypes from '../constants/store'

const initialState = [];

export default function store(state=initialState,action){
	switch(action.type){
		case actionTypes.STORE_UPDATE:
			return action.data
		case actionTypes.STORE_ADD:
			 state.unshift(action.data)
			 return state;
		case actionTypes.STORE_RM:
			return state.filter(item =>{
				return item.id !== action.data.id
			})
		default:
			return state

	}
}