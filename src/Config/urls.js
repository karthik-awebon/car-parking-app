export const API_BASE_URL = "";

export const getApiURL = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiURL('');
export const LOGOUT = getApiURL('');
export const REGISTER = getApiURL('');
export const LIST_COMMUNITY = getApiURL('')
export const CREATE_COMMUNITY = getApiURL('')
export const VERIFY_URL = getApiURL('')
export const BOOKING = getApiURL('')
export const UPLOAD = getApiURL('')
export const YARD = getApiURL('')
export const TERMINALS = getApiURL('')