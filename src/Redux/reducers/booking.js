import types from "../types";

const initial_state = {
    bookingData: {},
}

export default function(state=initial_state, action) {
    console.log("booking reducer")
    const data = action.payload
    switch (action.type) {
        case types.BOOKING:            
            return {...state, bookingData: data}
        default:
            return {...state}
    }
}