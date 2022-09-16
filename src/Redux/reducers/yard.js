import types from "../types";

const initial_state = {
    yardData: {},
}

export default function(state=initial_state, action) {
    console.log("yard reducer")
    const data = action.payload
    switch (action.type) {
        case types.YARD:            
            return {...state, yardData: data}
        default:
            return {...state}
    }
}