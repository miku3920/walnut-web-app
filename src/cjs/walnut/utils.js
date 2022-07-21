var HMAC_SHA256 = require('./HMAC_SHA256');

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
  option.Version = option.Version || '6.1';
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
