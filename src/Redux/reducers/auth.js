import types from "../types";

const initial_state = {
    userData: {},
    registerData: {}
}

export default function(state=initial_state, action) {
    const data = action.payload
    switch (action.type) {
        case types.LOGIN:            
            return {...state, userData: data}
        case types.REGISTER1:            
            return {...state, registerData: data}
        default:
            return {...state}
    }
}