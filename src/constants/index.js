import { Enum } from '../utils'

export const  DATA_REQUEST = "DATA_REQUEST"
export const  DATA_SUCCESS = "DATA_SUCCESS"
export const  DATA_FAILURE = "DATA_FAILURE"

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
