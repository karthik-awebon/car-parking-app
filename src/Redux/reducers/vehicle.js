import types from "../types";

const initial_state = {
    vehicleData: {},
}

export default function(state=initial_state, action) {
    console.log("vehicleData reducer", action.save_type, state.vehicleData);
    const data = action.payload
    switch (action.type) {
        case types.VEHICLE:   
            if(action.save_type == 'is_cash_booking'){
                return {...state, is_cash_booking : data}
            }else if(action.save_type == 'vehicle_action'){
                return {...state, vehicle_action : data}
            }else if(action.save_type == 'registration_no'){
                return {...state, registration_no : data}
            }else if(action.save_type == 'booking_ref'){
                return {...state, booking_ref : data}
            }else if(action.save_type == 'terminal'){
                return {...state, terminal : data}
            }else{
                return {...state, vehicle_movement : data}
            }
            
        default:
            return {...state}
    }
}