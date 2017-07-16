import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import { browserHistory } from 'react-router'

import { CALL_API, Schemas } from '../middleware/api'

import { 
        DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE,
        DEFAULTER_VALUE
       } 
from '../constants';


const fetchHoldersResp = (token, pageNo, itemsPerPage) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `holders?page=${pageNo}&limit=${itemsPerPage}`,
    schema: Schemas.HOLDER_RESP,
    token: token
  }
})


export const loadHolders = (token, pageNo, itemsPerPage) => (dispatch, getState) => {
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