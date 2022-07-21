/* eslint-disable camelcase */
import module_utils from './walnut/utils.mjs'
import module_event from './walnut/event.mjs'

export const utils = module_utils
export const event = module_event

const walnut = {
  utils: module_utils,
  event: module_event,
}

export default walnut
