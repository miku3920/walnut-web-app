import HMAC_SHA256 from './HMAC_SHA256.mjs'

function buildDataCheckString(dataParams) {
  const dataCheckArray = []
  Object.keys(dataParams).sort().forEach((key) => {
    dataCheckArray.push(`${key}=${dataParams[key]}`)
  })
  return dataCheckArray.join('\n')
}

function createVerificationHash(dataParams) {
  const { token } = dataParams
  delete dataParams.token

  const dataCheckString = buildDataCheckString(dataParams)

  const secretKey = HMAC_SHA256(token, 'WebAppData')
  return HMAC_SHA256(dataCheckString, secretKey, true)
}

function dataSafeStringify(data) {
  return JSON.stringify(data).replace(/\//g, '\\/')
}

function stringifyDataParams(dataParams) {
  if (typeof dataParams.user !== 'undefined') {
    dataParams.user = dataSafeStringify(dataParams.user)
  }
  if (typeof dataParams.receiver !== 'undefined') {
    dataParams.receiver = dataSafeStringify(dataParams.receiver)
  }
  if (typeof dataParams.chat !== 'undefined') {
    dataParams.chat = dataSafeStringify(dataParams.chat)
  }
  return dataParams
}

function urlSafeEncode(urldecoded) {
  try {
    urldecoded = encodeURIComponent(urldecoded)
  } catch (e) { }
  return urldecoded
}

function urlStringifyQueryParams(queryParams) {
  const queryArray = []
  Object.keys(queryParams).forEach((key) => {
    queryArray.push(`${urlSafeEncode(key)}=${urlSafeEncode(queryParams[key])}`)
  })
  return queryArray.join('&')
}

function urlStringifyHashString(params) {
  const debugString = params.Debug ? '1' : ''
  const themeString = JSON.stringify(params.ThemeParams)
  const versionString = `${params.Version}`
  const dataParams = stringifyDataParams(params.Data)
  dataParams.hash = createVerificationHash(dataParams)

  const dataString = urlStringifyQueryParams(dataParams)

  const queryParams = {
    tgWebAppData: dataString,
    tgWebAppVersion: versionString,
    tgWebAppThemeParams: themeString,
  }

  if (typeof params.Debug !== 'undefined') {
    queryParams.tgWebAppDebug = debugString
  }

  return `#${urlStringifyQueryParams(queryParams)}`
}

function setup(option) {
  option = option || {}
  option.Data = option.Data || {}
  option.Data.user = option.Data.user || {
    id: 127355800,
    first_name: '初音',
    last_name: 'ミク',
    username: 'miku3920',
    language_code: 'zh-hant',
  }
  option.Data.auth_date = option.Data.auth_date || Date.now()
  option.Data.token = option.Data.token || '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  option.Version = option.Version || '6.1'
  option.ThemeParams = option.ThemeParams || {
    bg_color: '#ffffff',
    button_color: '#40a7e3',
    button_text_color: '#ffffff',
    hint_color: '#999999',
    link_color: '#168acd',
    text_color: '#000000',
  }
  option.Debug = option.Debug || true

  window.location.hash = urlStringifyHashString(option)
}

setup()

export default {
  setup,
  urlStringifyHashString,
  urlStringifyQueryParams,
  urlSafeEncode,
  stringifyDataParams,
  dataSafeStringify,
  createVerificationHash,
  buildDataCheckString,
  HMAC_SHA256,
}
