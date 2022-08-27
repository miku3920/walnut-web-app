(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object')
		module.exports = factory(),
		exports.utils = module.exports.utils,
		exports.event = module.exports.event;
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else
		root["walnut"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var utils = __webpack_require__(797);
var event = __webpack_require__(532);

var walnut = {
  utils: utils,
  event: event
};

module.exports = walnut;


/***/ }),

/***/ 418:
/***/ ((module) => {

/* eslint-disable */

var create = Object.create || (function () {
  function F() { }

  return function (obj) {
    var subtype;

    F.prototype = obj;

    subtype = new F();

    F.prototype = null;

    return subtype;
  };
}());

var Base = (function () {
  return {
    extend: function (overrides) {
      var subtype = create(this);

      if (overrides) {
        subtype.mixIn(overrides);
      }

      if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
        subtype.init = function () {
          subtype.$super.init.apply(this, arguments);
        };
      }

      subtype.init.prototype = subtype;
      subtype.$super = this;

      return subtype;
    },
    create: function () {
      var instance = this.extend();
      instance.init.apply(instance, arguments);

      return instance;
    },
    init: function () {
    },
    mixIn: function (properties) {
      for (var propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
          this[propertyName] = properties[propertyName];
        }
      }
      if (properties.hasOwnProperty('toString')) {
        this.toString = properties.toString;
      }
    },
    clone: function () {
      return this.init.prototype.extend(this);
    }
  };
}());

var WordArray = Base.extend({
  init: function (words, sigBytes) {
    words = this.words = words || [];

    if (sigBytes != undefined) {
      this.sigBytes = sigBytes;
    } else {
      this.sigBytes = words.length * 4;
    }
  },
  toString: function (encoder) {
    return (encoder || Hex).stringify(this);
  },
  concat: function (wordArray) {
    var thisWords = this.words;
    var thatWords = wordArray.words;
    var thisSigBytes = this.sigBytes;
    var thatSigBytes = wordArray.sigBytes;

    this.clamp();

    if (thisSigBytes % 4) {
      for (var i = 0; i < thatSigBytes; i++) {
        var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
      }
    } else {
      for (var j = 0; j < thatSigBytes; j += 4) {
        thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
      }
    }
    this.sigBytes += thatSigBytes;

    return this;
  },
  clamp: function () {
    var words = this.words;
    var sigBytes = this.sigBytes;

    words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
    words.length = Math.ceil(sigBytes / 4);
  },
  clone: function () {
    var clone = Base.clone.call(this);
    clone.words = this.words.slice(0);

    return clone;
  }
});

var Hex = {
  stringify: function (wordArray) {
    var words = wordArray.words;
    var sigBytes = wordArray.sigBytes;

    var hexChars = [];
    for (var i = 0; i < sigBytes; i++) {
      var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      hexChars.push((bite >>> 4).toString(16));
      hexChars.push((bite & 0x0f).toString(16));
    }

    return hexChars.join('');
  },
  parse: function (hexStr) {
    var hexStrLength = hexStr.length;

    var words = [];
    for (var i = 0; i < hexStrLength; i += 2) {
      words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }

    return new WordArray.init(words, hexStrLength / 2);
  }
};

var Latin1 = {
  stringify: function (wordArray) {
    var words = wordArray.words;
    var sigBytes = wordArray.sigBytes;

    var latin1Chars = [];
    for (var i = 0; i < sigBytes; i++) {
      var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      latin1Chars.push(String.fromCharCode(bite));
    }

    return latin1Chars.join('');
  },
  parse: function (latin1Str) {
    var latin1StrLength = latin1Str.length;

    var words = [];
    for (var i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
    }

    return new WordArray.init(words, latin1StrLength);
  }
};

var Utf8 = {
  stringify: function (wordArray) {
    try {
      return decodeURIComponent(escape(Latin1.stringify(wordArray)));
    } catch (e) {
      throw new Error('Malformed UTF-8 data');
    }
  },
  parse: function (utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};

var BufferedBlockAlgorithm = Base.extend({
  reset: function () {
    this._data = new WordArray.init();
    this._nDataBytes = 0;
  },
  _append: function (data) {
    if (typeof data == 'string') {
      data = Utf8.parse(data);
    }

    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  },
  _process: function (doFlush) {
    var processedWords;

    var data = this._data;
    var dataWords = data.words;
    var dataSigBytes = data.sigBytes;
    var blockSize = this.blockSize;
    var blockSizeBytes = blockSize * 4;

    var nBlocksReady = dataSigBytes / blockSizeBytes;
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }

    var nWordsReady = nBlocksReady * blockSize;
    var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
    if (nWordsReady) {
      for (var offset = 0; offset < nWordsReady; offset += blockSize) {
        this._doProcessBlock(dataWords, offset);
      }
      processedWords = dataWords.splice(0, nWordsReady);
      data.sigBytes -= nBytesReady;
    }
    return new WordArray.init(processedWords, nBytesReady);
  },
  clone: function () {
    var clone = Base.clone.call(this);
    clone._data = this._data.clone();

    return clone;
  },
  _minBufferSize: 0
});

var Hasher = BufferedBlockAlgorithm.extend({
  cfg: Base.extend(),
  init: function (cfg) {
    this.cfg = this.cfg.extend(cfg);
    this.reset();
  },
  reset: function () {
    BufferedBlockAlgorithm.reset.call(this);
    this._doReset();
  },
  update: function (messageUpdate) {
    this._append(messageUpdate);
    this._process();

    return this;
  },
  finalize: function (messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
    var hash = this._doFinalize();
    return hash;
  },
  blockSize: 512 / 32
});

var HMAC = Base.extend({
  init: function (hasher, key) {
    hasher = this._hasher = new hasher.init();

    if (typeof key == 'string') {
      key = Utf8.parse(key);
    }

    var hasherBlockSize = hasher.blockSize;
    var hasherBlockSizeBytes = hasherBlockSize * 4;

    if (key.sigBytes > hasherBlockSizeBytes) {
      key = hasher.finalize(key);
    }

    key.clamp();

    var oKey = this._oKey = key.clone();
    var iKey = this._iKey = key.clone();

    var oKeyWords = oKey.words;
    var iKeyWords = iKey.words;

    for (var i = 0; i < hasherBlockSize; i++) {
      oKeyWords[i] ^= 0x5c5c5c5c;
      iKeyWords[i] ^= 0x36363636;
    }
    oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

    this.reset();
  },
  reset: function () {
    var hasher = this._hasher;

    hasher.reset();
    hasher.update(this._iKey);
  },
  update: function (messageUpdate) {
    this._hasher.update(messageUpdate);

    return this;
  },
  finalize: function (messageUpdate) {
    var hasher = this._hasher;

    var innerHash = hasher.finalize(messageUpdate);
    hasher.reset();
    var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

    return hmac;
  }
});

var H = [];
var K = [];

(function () {
  function isPrime(n) {
    var sqrtN = Math.sqrt(n);
    for (var factor = 2; factor <= sqrtN; factor++) {
      if (!(n % factor)) {
        return false;
      }
    }
    return true;
  }
  function getFractionalBits(n) {
    return ((n - (n | 0)) * 0x100000000) | 0;
  }
  var n = 2;
  var nPrime = 0;
  while (nPrime < 64) {
    if (isPrime(n)) {
      if (nPrime < 8) {
        H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
      }
      K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

      nPrime++;
    }

    n++;
  }
}());

var W = [];

var SHA256 = Hasher.extend({
  _doReset: function () {
    this._hash = new WordArray.init(H.slice(0));
  },
  _doProcessBlock: function (M, offset) {
    var H = this._hash.words;

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    var f = H[5];
    var g = H[6];
    var h = H[7];

    for (var i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        var gamma0x = W[i - 15];
        var gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^
          ((gamma0x << 14) | (gamma0x >>> 18)) ^
          (gamma0x >>> 3);

        var gamma1x = W[i - 2];
        var gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^
          ((gamma1x << 13) | (gamma1x >>> 19)) ^
          (gamma1x >>> 10);

        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }

      var ch = (e & f) ^ (~e & g);
      var maj = (a & b) ^ (a & c) ^ (b & c);

      var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
      var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));

      var t1 = h + sigma1 + ch + K[i] + W[i];
      var t2 = sigma0 + maj;

      h = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }

    H[0] = (H[0] + a) | 0;
    H[1] = (H[1] + b) | 0;
    H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0;
    H[5] = (H[5] + f) | 0;
    H[6] = (H[6] + g) | 0;
    H[7] = (H[7] + h) | 0;
  },
  _doFinalize: function () {
    var data = this._data;
    var dataWords = data.words;

    var nBitsTotal = this._nDataBytes * 8;
    var nBitsLeft = data.sigBytes * 8;

    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
    data.sigBytes = dataWords.length * 4;

    this._process();
    return this._hash;
  },
  clone: function () {
    var clone = Hasher.clone.call(this);
    clone._hash = this._hash.clone();

    return clone;
  }
});

function HMAC_SHA256(data, secret, hex) {
  var hash = new HMAC.init(SHA256, secret).finalize(data);
  return hex ? hash.toString() : hash;
}

module.exports = HMAC_SHA256;


/***/ }),

/***/ 532:
/***/ ((module) => {

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


/***/ }),

/***/ 797:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var HMAC_SHA256 = __webpack_require__(418);

function buildDataCheckString(dataParams) {
  var dataCheckArray = [];
  Object.keys(dataParams).sort().forEach(function (key) {
    dataCheckArray.push(key + '=' + dataParams[key]);
  });
  return dataCheckArray.join('\n');
}

function createVerificationHash(dataParams) {
  var token = dataParams.token;
  delete dataParams.token;

  var dataCheckString = buildDataCheckString(dataParams);

  var secretKey = HMAC_SHA256(token, 'WebAppData');
  return HMAC_SHA256(dataCheckString, secretKey, true);
}

function dataSafeStringify(data) {
  return JSON.stringify(data).replace(/\//g, '\\/');
}

function stringifyDataParams(dataParams) {
  if (typeof dataParams.user !== 'undefined') {
    dataParams.user = dataSafeStringify(dataParams.user);
  }
  if (typeof dataParams.receiver !== 'undefined') {
    dataParams.receiver = dataSafeStringify(dataParams.receiver);
  }
  if (typeof dataParams.chat !== 'undefined') {
    dataParams.chat = dataSafeStringify(dataParams.chat);
  }
  return dataParams;
}

function urlSafeEncode(urldecoded) {
  try {
    urldecoded = encodeURIComponent(urldecoded);
  } catch (e) { }
  return urldecoded;
}

function urlStringifyQueryParams(queryParams) {
  var queryArray = [];
  Object.keys(queryParams).forEach(function (key) {
    queryArray.push(urlSafeEncode(key) + '=' + urlSafeEncode(queryParams[key]));
  });
  return queryArray.join('&');
}

function urlStringifyHashString(params) {
  var debugString = params.Debug ? '1' : '';
  var themeString = JSON.stringify(params.ThemeParams);
  var versionString = params.Version + '';
  var dataParams = stringifyDataParams(params.Data);
  dataParams.hash = createVerificationHash(dataParams);

  var dataString = urlStringifyQueryParams(dataParams);

  var queryParams = {
    tgWebAppData: dataString,
    tgWebAppVersion: versionString,
    tgWebAppThemeParams: themeString
  };

  if (typeof params.Debug !== 'undefined') {
    queryParams.tgWebAppDebug = debugString;
  }

  return '#' + urlStringifyQueryParams(queryParams);
}

function setup(option) {
  option = option || {};
  option.Data = option.Data || {};
  option.Data.user = option.Data.user || {
    id: 127355800,
    first_name: '初音',
    last_name: 'ミク',
    username: 'miku3920',
    language_code: 'zh-hant'
  };
  option.Data.auth_date = option.Data.auth_date || Date.now();
  option.Data.token = option.Data.token || '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  option.Version = option.Version || '6.2';
  option.ThemeParams = option.ThemeParams || {
    bg_color: '#ffffff',
    button_color: '#40a7e3',
    button_text_color: '#ffffff',
    hint_color: '#999999',
    link_color: '#168acd',
    text_color: '#000000'
  };
  option.Debug = option.Debug || true;

  window.location.hash = urlStringifyHashString(option);
}

setup();

module.exports = {
  setup: setup,
  urlStringifyHashString: urlStringifyHashString,
  urlStringifyQueryParams: urlStringifyQueryParams,
  urlSafeEncode: urlSafeEncode,
  stringifyDataParams: stringifyDataParams,
  dataSafeStringify: dataSafeStringify,
  createVerificationHash: createVerificationHash,
  buildDataCheckString: buildDataCheckString,
  HMAC_SHA256: HMAC_SHA256
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(278);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});