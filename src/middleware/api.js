import { normalize, denormalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'

const getNextPageUrl = response => {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = 'https://statements-api.herokuapp.com/api/'


const callApi = (endpoint, token, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        const camelizedJson = camelizeKeys(json)
        const result = Object.assign({},
          normalize(camelizedJson, schema))

        return result

      })
    ).catch(error => {
      console.log("API CALL ERROR : " + JSON.stringify(error))
    })
}


const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.login.toLowerCase()
})

const repoSchema = new schema.Entity('repos', {
  owner: userSchema
}, {
    idAttribute: repo => repo.fullName.toLowerCase()
  })

const gameSchema = new schema.Entity('games', {}, {
  idAttribute: game => game.id
})

const discoverySchema = new schema.Entity("discoveries", {}, {})

const holderSchema = new schema.Entity('holders', {})

const contentSchema = new schema.Entity('holders')
const holdersRespSchema = new schema.Entity('holdersResp')
holdersRespSchema.define({
  content: [contentSchema]
})

const maritalTrendSchema = new schema.Entity('maritalTrend', {})
const educationTrendSchema = new schema.Entity('educationTrend', {})
const ageTrendSchema = new schema.Entity('ageTrend', {})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  GAME: gameSchema,
  GAME_ARRAY: [gameSchema],
  DISCOVERY: discoverySchema,
  DISCOVERY_ARRAY: [discoverySchema],
  HOLDER: holderSchema,
  HOLDER_ARRAY: [holderSchema],
  HOLDER_RESP: holdersRespSchema,
  MARITAL_TREND: maritalTrendSchema,
  EDUCATION_TREND: educationTrendSchema,
  AGE_TREND: ageTrendSchema
}

export const CALL_API = 'Call API'


export default store => next => action => {

  const callAPI = action[CALL_API]


  if (typeof callAPI === 'undefined') {
    return next(action)
  }


  let { endpoint } = callAPI
  const { schema, types, token } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!token) {
    throw new Error('Unauthenticated request!')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, token, schema).then(
    response => next(actionWith({
      payload: response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
