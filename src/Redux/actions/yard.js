import { YARD } from "../../Config/urls"
import { apiGet, apiPost } from "../../Utils/Utils"
import store from "../store"
import types from "../types";

const { dispatch } = store

export const saveYardData = (data) => {
    console.log("saveYARDData", data);
    dispatch({
        type: types.YARD,
        payload: data
    })
}

export const yard = (data) => {
    console.log("data YARD", data);
    return new Promise((resolve, reject) => {
        return apiPost(YARD, data).then((res) => {
            console.log("res in YARD action",res);
             if(res?.code == 200){
                resolve(res)
                saveYardData(data)
            } else {
                reject(res);
            }            
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

