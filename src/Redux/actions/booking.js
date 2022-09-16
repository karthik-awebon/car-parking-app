import { BOOKING } from "../../Config/urls"
import { apiGet, apiPost } from "../../Utils/Utils"
import store from "../store"
import types from "../types";

const { dispatch } = store

export const saveBookingData = (data) => {
    console.log("saveBookingData", data);
    dispatch({
        type: types.BOOKING,
        payload: data
    })
}

export const booking = (data) => {
    console.log("data BOOKING", data);
    return new Promise((resolve, reject) => {
        return apiPost(BOOKING, data).then((res) => {
            console.log("res in BOOKING action",res);
            if (res) {
                resolve(res)
                saveBookingData(res.data)
            } else {
                reject(res);
            }            
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

