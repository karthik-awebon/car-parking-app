import types from "../types";

const initial_state = {
    communityList: [],
    newCommunity: new FormData()
}

export default function(state=initial_state, action) {
    const data = action.payload
    switch (action.type) {        
        case types.LIST_COMMUNITY:
            return {...state, communityList: data}
        case types.CREATE_COMMUNITY_STEP:
            Object.keys(data).forEach((key) => {
                state.newCommunity.append(key, data[key])
            });
            return {...state, newCommunity: state.newCommunity}
        case types.CLEAR_CREATE_COMMUNITY:
            return {...state, newCommunity: {}}
        default:
            return {...state}
    }
}