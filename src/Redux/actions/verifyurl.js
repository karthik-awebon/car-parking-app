import { VERIFY_URL } from "../../Config/urls"
import { apiGet, apiPost } from "../../Utils/Utils"
import store from "../store"
import types from "../types";

const { dispatch } = store

export const saveVerifyURL = (data) => {
    console.log("saveBookingData", data);
    dispatch({
        type: types.VERIFYURL,
        payload: true
    })
}

export const verifyurl = (data) => {
    console.log("data verifyurl", data);
    return new Promise((resolve, reject) => {
        return apiPost(VERIFY_URL, data).then((res) => {
            console.log("res in verifyurl action",res?.data?.verified);
            if (res.data) {
                resolve(res);
                if(res?.data?.verified)
                saveVerifyURL(res.data);
            } else {
                reject(res);
            }            
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

