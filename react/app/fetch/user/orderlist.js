import {get} from '../get.js'
import {post} from '../post.js'

export function getOrderList(username){
	const result = get('/api/user/orderlist/'+username);
	return result
}
export function postComment(id,comment){
	const result = post('/api/user/submitComment',{
		id:id,comment:comment
	})
	return result
}