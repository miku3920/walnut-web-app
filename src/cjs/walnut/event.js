var handler = {};
var funcEmpty = function () {};

var getOriginalPost = window.TelegramWebviewProxy !== undefined ? function (type, data) {
  return function () {
    if (window.external && window.external.invoke) {
      window.external.invoke(JSON.stringify([type, data]));
    }
  };
} : function (type, data) {
  return function () {
    // eslint-disable-next-line no-console
    console.log('[Walnut.debug] postEvent', type, data);
  };
};

handler.default = function (e) {
  // eslint-disable-next-line no-console
  console.log('[Walnut.default] postEvent', e.type, e.data);
};

handler.all = funcEmpty;

function receive(type, data) {
  var event = {
    type: type,
    data: data,
    post: getOriginalPost(type, data)
  };

  var func = handler[type] || handler.default || funcEmpty;
  try {
    func(event);
  } catch (e) { }

  var funcAll = handler.all || funcEmpty;
  try {
    funcAll(event);
  } catch (e) { }
}

function on(type, callback) {
  handler[type] = callback;
}

function off(type) {
  handler[type] = funcEmpty;
}

window.TelegramWebviewProxy = {
  postEvent: receive
};

module.exports = {
  on: on,
  off: off,
  receive: receive
};
