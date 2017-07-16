import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import data from './data'

export default combineReducers({
 data,
 routing
})