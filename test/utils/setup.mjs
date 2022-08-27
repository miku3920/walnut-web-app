import walnut from '@/factory.mjs'

test('location hash should be set by default', () => {
  // eslint-disable-next-line no-undef
  expect(window.location.hash.toString().substring(0, 304)).toBe('#tgWebAppData=user%3D%257B%2522id%2522%253A127355800%252C%2522first_name%2522%253A%2522%25E5%2588%259D%25E9%259F%25B3%2522%252C%2522last_name%2522%253A%2522%25E3%2583%259F%25E3%2582%25AF%2522%252C%2522username%2522%253A%2522miku3920%2522%252C%2522language_code%2522%253A%2522zh-hant%2522%257D%26auth_date')
})

test('default setup', () => {
  walnut.utils.setup({
    Data: {
      user: {
        id: 127355800,
        first_name: '初音',
        last_name: 'ミク',
        username: 'miku3920',
        language_code: 'zh-hant',
      },
      auth_date: '1657630177',
      token: '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    Version: '6.2',
    ThemeParams: {
      bg_color: '#ffffff',
      button_color: '#40a7e3',
      button_text_color: '#ffffff',
      hint_color: '#999999',
      link_color: '#168acd',
      text_color: '#000000',
    },
    Debug: true,
  })
  // eslint-disable-next-line no-undef
  expect(window.location.hash).toBe('#tgWebAppData=user%3D%257B%2522id%2522%253A127355800%252C%2522first_name%2522%253A%2522%25E5%2588%259D%25E9%259F%25B3%2522%252C%2522last_name%2522%253A%2522%25E3%2583%259F%25E3%2582%25AF%2522%252C%2522username%2522%253A%2522miku3920%2522%252C%2522language_code%2522%253A%2522zh-hant%2522%257D%26auth_date%3D1657630177%26hash%3D08ab72c77e05598ae9d3a8b2f442e1f9c9333e6c9552fe7c5ad95f2e41cc24b7&tgWebAppVersion=6.2&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22text_color%22%3A%22%23000000%22%7D&tgWebAppDebug=1')
})

test('location hash should be set', () => {
  walnut.utils.setup({
    Data: {
      query_id: 'AAGYS5cHAAAAAJhLlwd9TKmN',
      user: {
        id: 127355800,
        first_name: '初音',
        last_name: 'ミク',
        username: 'miku3920',
        language_code: 'zh-hant',
      },
      auth_date: '1657630177',
      token: '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    Version: '6.2',
    ThemeParams: {
      bg_color: '#ffffff',
      button_color: '#40a7e3',
      button_text_color: '#ffffff',
      hint_color: '#999999',
      link_color: '#168acd',
      text_color: '#000000',
    },
    Debug: true,
  })
  // eslint-disable-next-line no-undef
  expect(window.location.hash).toBe('#tgWebAppData=query_id%3DAAGYS5cHAAAAAJhLlwd9TKmN%26user%3D%257B%2522id%2522%253A127355800%252C%2522first_name%2522%253A%2522%25E5%2588%259D%25E9%259F%25B3%2522%252C%2522last_name%2522%253A%2522%25E3%2583%259F%25E3%2582%25AF%2522%252C%2522username%2522%253A%2522miku3920%2522%252C%2522language_code%2522%253A%2522zh-hant%2522%257D%26auth_date%3D1657630177%26hash%3D40f80921d1169a195c9b69a483a10e9c4b0cb31dc69439dd98e257cf59a4d037&tgWebAppVersion=6.2&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22text_color%22%3A%22%23000000%22%7D&tgWebAppDebug=1')
})
