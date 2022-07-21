/* eslint-disable */
import * as walnut from '../dist/walnut.js'
import walnutDefault from '../dist/walnut.js'
import * as walnutMin from '../dist/walnut.min.js'
import walnutMinDefault from '../dist/walnut.min.js'
import * as walnutESM from '../dist/walnut.mjs'
import walnutESMDefault from '../dist/walnut.mjs'
import * as walnutESMMin from '../dist/walnut.min.mjs'
import walnutESMMinDefault from '../dist/walnut.min.mjs'

const type = (process.env.TYPE || '').trim()
let result = walnut

switch (type) {
  case 'walnut': {
    result = walnut
    break
  }
  case 'walnutDefault': {
    result = walnutDefault
    break
  }
  case 'walnutMin': {
    result = walnutMin
    break
  }
  case 'walnutMinDefault': {
    result = walnutMinDefault
    break
  }
  case 'walnutESM': {
    result = walnutESM
    break
  }
  case 'walnutESMDefault': {
    result = walnutESMDefault
    break
  }
  case 'walnutESMMin': {
    result = walnutESMMin
    break
  }
  case 'walnutESMMinDefault': {
    result = walnutESMMinDefault
    break
  }
  default:{
    break
  }
}

// console.log(result, type)

export default result
