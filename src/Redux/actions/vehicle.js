import { TERMINALS } from "../../Config/urls"
import { apiGet } from "../../Utils/Utils"
import store from "../store"
import types from "../types";

const { dispatch } = store

export const vehicle = (data, type=null) => {
    console.log("saveVehicleData", data, type);
    dispatch({
        type: types.VEHICLE,
        payload: data,
        save_type: type
    })

    return true;
}

export const getTerminals = () => {
    console.log("getTerminals")
    return new Promise((resolve, reject) => {
        return apiGet(TERMINALS).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        });
    });    
}