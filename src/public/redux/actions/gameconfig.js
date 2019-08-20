import axios from 'axios';
import URL from "../URL";
// let URL = 'http://192.168.6.169:5000'
//let URL = 'http://localhost:5000'

export const getConfig = () => {
  return {
    type: 'GET_CONFIGS',
    payload: axios.get(URL+'/config'),
  };
};
/////////////////////////////////////////////
export const postConfig = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_CONFIG",
    payload: axios.post(URL+'/player', data,{})
  };
};
/////////////////////////////////////////////   BUAT LOGOUT   
export const deleteConfig = (param) =>{
  //console.log('action id', param)
	return{
    type: 'DELETE_CONFIG',
		payload: axios.patch(URL +`/player/${param}`)
	}
}
/////////////////////////////////////////////
export const getConfig1 = (bookid) => {
  console.log("book id: " + bookid)
  return {
      type: 'GET_CONFIG1',
      payload: axios.get(URL +`/player/${bookid}`)
  }
}
/////////////////////////////////////////////
export const updateConfig = (bookid, data) => {
  //console.log("book id: " + bookid)
  return {
      type: 'UPDATE_CONFIG',
      payload: axios.patch(URL +`/player/${bookid}`, data)
  }
}