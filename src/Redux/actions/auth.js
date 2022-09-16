import { LOGIN, REGISTER, LOGOUT } from "../../Config/urls"
import { apiGet, apiPost, clearUserData, setUserData } from "../../Utils/Utils"
import store from "../store"
import types from "../types";

const { dispatch } = store

export const saveUserData = (data) => {
    dispatch({
        type: types.LOGIN,
        payload: data
    })
}

export const saveRegisterData = (data) => {
    dispatch({
        type: types.REGISTER1,
        payload: data
    })
}

export const login = (data) => {
    console.log("data login", data);
    return new Promise((resolve, reject) => {
        return apiPost(LOGIN, data).then((res) => {
            console.log("res in login action",res);
            if (res.code == 200) {
                if (res?.data?.active == '1') {
                    setUserData(res.data).then(() => {
                        resolve(res.data)
                        saveUserData(res.data)
                        setUserData(res.data)
                    });
                    return
                }
            } else {
                reject(res);
            }           
        }).catch((error) => {
            reject(error)
        })
    })
}

export const register = (data) => {
    return apiPost(REGISTER, data)
}

export const logout = (data) => {
    console.log("data logout", data);
    return new Promise((resolve, reject) => {
        return apiPost(LOGOUT, data).then((res) => {
            console.log("res in logout action",res);
            if (res?.code == 200) {
                dispatch({
                    type: types.CLEAR_REDUX_STATE,
                    payload: {}
                });
                clearUserData()
                return
            } else {
                reject(res);
            }           
        }).catch((error) => {
            reject(error)
        })
    })
}