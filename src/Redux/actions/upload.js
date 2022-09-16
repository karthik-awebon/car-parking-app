import { UPLOAD } from "../../Config/urls"
import { apiGet, apiPost, test, apiPostFormData } from "../../Utils/Utils"
import store from "../store"
import types from "../types";

const { dispatch } = store

export const upload = (data) => {
    console.log("upload");
    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    return new Promise((resolve, reject) => {
        console.log("upload promise");
        return apiPostFormData(UPLOAD, data, headers).then((res) => {
            console.log("res in upload action",res?.data?.verified);
            if (res.data) {
                resolve(res);
                dispatch({
                    type: types.VERIFYURL,
                    payload: true
                })
            } else {
                reject(res);
            }            
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const uploadImages = (data) => {
    dispatch({
        type: types.UPLOAD_IMAGES,
        payload: data,
    })
}

export const clearUploadImages = (data) => {
    dispatch({
        type: types.CLEAR_UPLOAD_IMAGES,
        payload: data,
    })
}

