import axios from 'axios';
import URL from "../URL";

//let URL = 'http://localhost:5000'

export const getleaderboard = () => {
  return {
    type: 'GET_LEADERBOARD',
    payload: axios.get(URL+'/leaderboard'),
  };
};
///////////////////////////////
export const getScore = () => {
  return {
    type: 'GET_SCORE',
    payload: axios.get(URL+'/leaderboard/score'),
  };
};
/////////////////////////////////////////////
export const postleaderboard = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_LEADERBOARD",
    payload: axios.post(URL+'/leaderboard', data)
  };
};
/////////////////////////////////////////////
export const deleteleaderboard = (param) =>{
  //console.log('action id', param)
	return{
		type: 'DELETE_LEADERBOARD',
		payload: axios.delete(URL +`/leaderboard/${param}`)
	}
}
/////////////////////////////////////////////
export const getleaderboard1 = (bookid) => {
  console.log("book id: " + bookid)
  return {
      type: 'GET_LEADERBOARD1',
      payload: axios.get(URL +`/leaderboard/${bookid}`)
  }
}
/////////////////////////////////////////////
export const updateleaderboard = (bookid, data) => {
  //console.log("book id: " + bookid)
  return {
      type: 'UPDATE_LEADERBOARD',
      payload: axios.patch(URL +`/leaderboard/${bookid}`, data)
  }
}
