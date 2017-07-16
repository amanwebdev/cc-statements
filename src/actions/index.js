import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import { browserHistory } from 'react-router'

import { CALL_API, Schemas } from '../middleware/api'

import { 
        LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
        DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE,
        RESIZE_APP,
        DEFAULTER_VALUE
       } 
from '../constants';


const baseUrl = "https://statements-api.herokuapp.com/api/";


export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
    }
}

export function loginUser(username, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch(`${baseUrl}/auth`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.token));
                    browserHistory.push(redirect);
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}




const fetchGames = (token) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `findall`,
    schema: Schemas.GAME_ARRAY,
    token: token
  }
})


export const loadGames = (token) => (dispatch, getState) => {
  return dispatch(fetchGames(token))
}

const fetchDiscoveries = (keyword, token) =>({
  [CALL_API] : {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `/find?title=${keyword}`,
    schema: Schemas.DISCOVERY_ARRAY,
    token: token
  }
})

export const loadDiscoveries = (keyword, token) => (dispatch, getState) => {
  return dispatch(fetchDiscoveries(keyword, token))
}

function updateSize(){
  return {
    type: RESIZE_APP
  }
}
export const resizeApp = () => (dispatch, getState) => {
  console.log('resizing'+window.innerWidth);
  dispatch(updateSize());
}

const fetchHolders = (token, pageNo, itemsPerPage) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `holders?page=${pageNo}&limit=${itemsPerPage}`,
    schema: Schemas.HOLDER_ARRAY,
    token: token
  }
})
const fetchHoldersResp = (token, pageNo, itemsPerPage) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `holders?page=${pageNo}&limit=${itemsPerPage}`,
    schema: Schemas.HOLDER_RESP,
    token: token
  }
})


export const loadHolders = (token, pageNo, itemsPerPage) => (dispatch, getState) => {
  //dispatch(fetchHolders(token, pageNo, itemsPerPage))
  dispatch(fetchHoldersResp(token, pageNo, itemsPerPage))
}

const fetchDefaulters = (token, pageNo, itemsPerPage) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `defaulters?delayValue=${DEFAULTER_VALUE}&page=${pageNo}&limit=${itemsPerPage}`,
    schema: Schemas.HOLDER_RESP,
    token: token
  }
})


export const loadDefaulters = (token, pageNo, itemsPerPage) => (dispatch, getState) => {
  return dispatch(fetchDefaulters(token, pageNo, itemsPerPage))
}

const fetchHolder = (token,holderId) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `holders/${holderId}`,
    schema: Schemas.HOLDER,
    token: token
  }
})


export const loadHolder = (token, holderId) => (dispatch, getState) => {
  return dispatch(fetchHolder(token, holderId))
}


const fetchHolderById = (token, holderId, pageNo, itemsPerPage) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `holders/?idLike=${holderId}&page=${pageNo}&limit=${itemsPerPage}`,
    schema: Schemas.HOLDER_RESP,
    token: token
  }
})


export const filterHoldersById = (token, holderId, pageNo, itemsPerPage) => (dispatch, getState) => {
  return dispatch(fetchHolderById(token, holderId, pageNo, itemsPerPage))
}

const fetchHolderByName = (token,holderName, pageNo, itemsPerPage) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `holders/?nameLike=${holderName}&page=${pageNo}&limit=${itemsPerPage}`,
    schema: Schemas.HOLDER_RESP,
    token: token
  }
})


export const filterHoldersByName = (token, holderName, pageNo, itemsPerPage) => (dispatch, getState) => {
  return dispatch(fetchHolderByName(token, holderName, pageNo, itemsPerPage))
}

const fetchMaritalTrendData = (token) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `maritalTrend`,
    schema: Schemas.MARITAL_TREND,
    token: token
  }
})
const fetchEducationTrendData = (token) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `educationTrend`,
    schema: Schemas.EDUCATION_TREND,
    token: token
  }
})
const fetchAgeTrendData = (token) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `ageTrend`,
    schema: Schemas.AGE_TREND,
    token: token
  }
})

export const loadTrendData = (token) => (dispatch, getState) => {
  dispatch(fetchMaritalTrendData(token))
  dispatch(fetchEducationTrendData(token))
  dispatch(fetchAgeTrendData(token))
}