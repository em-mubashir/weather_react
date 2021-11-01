import { SET_ALERT, AlertAction } from '../types/actions';

export const setAlert = (message: string): AlertAction => {
  return {
    type: SET_ALERT,
    payload: message
  }
}