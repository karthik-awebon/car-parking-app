import types from "../types";

const initial_state = {
    uploadImages: [],
}

export default function(state=initial_state, action) {
    const data = action.payload
    switch (action.type) {        
        case types.UPLOAD_IMAGES:
            return {...state, uploadImages: data}
        case types.CLEAR_UPLOAD_IMAGES:
            return {...state, uploadImages: {}}
        default:
            return {...state}
    }
}