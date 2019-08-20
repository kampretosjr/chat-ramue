import axios from 'axios';
import URL from "../URL";
// let URL = 'http://192.168.6.169:5000'
//let URL = 'http://localhost:5000'

export const getPlayer = () => {
  return {
    type: 'GET_PLAYERS',
    payload: axios.get(URL+'/player'),
  };
};
/////////////////////////////////////////////
export const registPlayer = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_PLAYER",
    payload: axios.post(URL+'/player', data)
  };
};
/////////////////////////////////////////////
export const loginPlayer = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_LOGIN_PLAYER",
    payload: axios.post(URL+'/player/login', data)
  };
};
/////////////////////////////////////////////   BUAT LOGOUT   
export const logout = (param) =>{
  //console.log('action id', param)
	return{
    type: 'LOGOUT_PLAYER',
		payload: axios.patch(URL +`/player/logout/${param}`)
	}
}
/////////////////////////////////////////////
export const getBuku1 = (bookid) => {
  console.log("book id: " + bookid)
  return {
      type: 'GET_PLAYER1',
      payload: axios.get(URL +`/player/${bookid}`)
  }
}
/////////////////////////////////////////////
export const updatePlayer = (bookid, data) => {
  //console.log("book id: " + bookid)
  return {
      type: 'UPDATE_PLAYER',
      payload: axios.patch(URL +`/player/${bookid}`, data)
  }
}