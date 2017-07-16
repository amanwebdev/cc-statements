import { Enum } from '../utils'

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST"
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const LOGOUT_USER = "LOGOUT_USER"

export const  RECEIVE_GAMES_REQUEST = "RECEIVE_GAMES_REQUEST"
export const  RECEIVE_GAMES_SUCCESS = "RECEIVE_GAMES_SUCCESS"
export const  RECEIVE_GAMES_FAILURE = "RECEIVE_GAMES_FAILURE"

export const  DISCOVERIES_REQUEST = "DISCOVERIES_REQUEST"
export const  DISCOVERIES_SUCCESS = "DISCOVERIES_SUCCESS"
export const  DISCOVERIES_FAILURE = "DISCOVERIES_FAILURE"

export const  DATA_REQUEST = "DATA_REQUEST"
export const  DATA_SUCCESS = "DATA_SUCCESS"
export const  DATA_FAILURE = "DATA_FAILURE"

export const RESIZE_APP = "RESIZE_APP"

export const ITEMS_PER_PAGE = 15

export const DEFAULTER_VALUE = 6

export const  SortType = {
	score : "score",
	name : "name",
	platform : "platform"
}

export const SortOrder = {
	desc : "desc",
	asc	: "asc"
}

export const SEX = Enum({
  1: 'Male',
  2: 'Female'
})

export const MARITAL_STATUS = Enum({
  0: 'Uknown',
  1: 'Married',
  2: 'Single',
  3: 'Other'
})

export const EDUCATION = Enum({
  1: 'Graduate School',
  2: 'University',
  3: 'High School',
  4: 'Other',
  5: 'Unknown',
  6: 'Unknown'
})
