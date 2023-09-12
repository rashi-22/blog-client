import axios from "axios";

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER"

export const handlLogin = (data) => {
    return async (dispatch, getState) => {
        try{
            const user = await axios({
                method: "post",
                url: "http://localhost:3001/login",
                data: {...data}
            })
            if(user?.data){
                dispatch({
                    type: SET_USER,
                    payload: user?.data,
                })
            }
        }catch(ex){
            return ex
        }      
    }
}
export const handleLogoutUser = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOGOUT_USER,
            payload: null,
        })
    }
}