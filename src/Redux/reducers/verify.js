import types from "../types";

const initial_state = {
    verifyurl: {},
}

export default function(state=initial_state, action) {
    console.log("verifyurl reducer")
    const data = action.payload
    switch (action.type) {
        case types.VERIFYURL:            
            return {...state, verifyurl: data}
        default:
            return {...state}
    }
}