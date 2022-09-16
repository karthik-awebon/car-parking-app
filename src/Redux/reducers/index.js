import { combineReducers } from "redux";
import types from "../types";
import auth from "./auth";
import community from "./community";
import booking from "./booking";
import vehicle from "./vehicle";
import verify from "./verify";
import yard from "./yard";
import upload from "./upload";

const appReducer = combineReducers({
    auth,community,booking,vehicle,verify,yard,upload
})
const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer