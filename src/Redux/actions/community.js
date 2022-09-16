import { CREATE_COMMUNITY, LIST_COMMUNITY } from "../../Config/urls"
import { apiGet, apiPost } from "../../Utils/Utils"
import store from "../store"
import types from "../types";

const { dispatch } = store

export const createCommunity = (data) => {
    return apiPost(CREATE_COMMUNITY, data)
}

export const saveCommunityStep = (data) => {    
    dispatch({
        type: types.CREATE_COMMUNITY_STEP,
        payload: data
    })
}

export const clearCommunityCreateData = () => {
    dispatch({
        type: types.CLEAR_CREATE_COMMUNITY,
        payload: data
    })
}

export const getCommunityList = () => {
    return new Promise((resolve, reject) => {
        return apiGet(LIST_COMMUNITY).then((res) => {
            //console.log("res",res);
            dispatch({
                type: types.LIST_COMMUNITY,
                payload: res
            });
            resolve(res)
        }).catch((error) => {
            reject(error)
        });
    });    
}

