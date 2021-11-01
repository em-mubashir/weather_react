import {AlertState} from "../types"
import {  AlertAction, SET_ALERT } from "../types/actions";

const initialState: AlertState = {
  message: ''
}

export default (state = initialState, action: AlertAction): AlertState => {
  switch(action.type) {
    case SET_ALERT:
      return {
        message: action.payload
      }
    default:
      return state;
  }
}