import {get} from '../get'

export function getInfo(id){
	const result = get('/api/detail/info/'+ id );
	return result;
}
export function getComment(id,page){
	const result = get('/api/detail/comment/'+ page + '/' + id);
	return result;
}