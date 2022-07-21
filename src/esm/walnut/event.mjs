const handler = {}
const funcEmpty = () => {}

const getOriginalPost = window.TelegramWebviewProxy !== undefined ? (type, data) => () => {
  if (window.external && window.external.invoke) {
    window.external.invoke(JSON.stringify([type, data]))
  }
} : (type, data) => () => {
  // eslint-disable-next-line no-console
  console.log('[Walnut.debug] postEvent', type, data)
}

handler.default = (e) => {
  // eslint-disable-next-line no-console
  console.log('[Walnut.default] postEvent', e.type, e.data)
}

handler.all = funcEmpty

function receive(type, data) {
  const event = {
    type,
    data,
    post: getOriginalPost(type, data),
  }

  const func = handler[type] || handler.default || funcEmpty
  try {
    func(event)
  } catch (e) { }

  const funcAll = handler.all || funcEmpty
  try {
    funcAll(event)
  } catch (e) { }
}

function on(type, callback) {
  handler[type] = callback
}

function off(type) {
  handler[type] = funcEmpty
}

window.TelegramWebviewProxy = {
  postEvent: receive,
}

export default {
  on,
  off,
  receive,
}
