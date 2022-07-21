import walnut from '@/factory.mjs'

test('hash should be built 1', () => {
  expect(walnut.utils.urlStringifyHashString({
    Data: {
      query_id: 'AAGAXhIqAgAAAIBeEipvh4iQ',
      user: {
        id: 5000814208,
        first_name: '初音',
        last_name: 'ミク',
        username: 'miku3920',
        language_code: 'zh-hant',
        photo_url: 'https://a-ttgme.stel.com/i/userpic/320/QzCaPKoRQNuVxt5C380lpE3wirX0XmRobkgPmzk5ma9yd7wpSz64DfLCMn6TBe1o.svg',
      },
      receiver: {
        id: 3593,
        is_bot: true,
        first_name: 'BotFather',
        last_name: '',
        username: 'botfather',
        photo_url: 'https://a-ttgme.stel.com/i/userpic/320/IXVj0cIEa6e-0VHnsP0AdudAmaQsFavgezL8jLZQD_c.svg',
      },
      auth_date: '1657791785',
      token: '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    Version: 6.1,
    ThemeParams: {
      bg_color: '#ffffff',
      button_color: '#40a7e3',
      button_text_color: '#ffffff',
      hint_color: '#999999',
      link_color: '#168acd',
      text_color: '#000000',
    },
  })).toBe('#tgWebAppData=query_id%3DAAGAXhIqAgAAAIBeEipvh4iQ%26user%3D%257B%2522id%2522%253A5000814208%252C%2522first_name%2522%253A%2522%25E5%2588%259D%25E9%259F%25B3%2522%252C%2522last_name%2522%253A%2522%25E3%2583%259F%25E3%2582%25AF%2522%252C%2522username%2522%253A%2522miku3920%2522%252C%2522language_code%2522%253A%2522zh-hant%2522%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Fa-ttgme.stel.com%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252FQzCaPKoRQNuVxt5C380lpE3wirX0XmRobkgPmzk5ma9yd7wpSz64DfLCMn6TBe1o.svg%2522%257D%26receiver%3D%257B%2522id%2522%253A3593%252C%2522is_bot%2522%253Atrue%252C%2522first_name%2522%253A%2522BotFather%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522botfather%2522%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Fa-ttgme.stel.com%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252FIXVj0cIEa6e-0VHnsP0AdudAmaQsFavgezL8jLZQD_c.svg%2522%257D%26auth_date%3D1657791785%26hash%3D9fe67e5d3d22f8342348dd40c1cad747908d3636708c9267e8eebf02f2af7688&tgWebAppVersion=6.1&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22text_color%22%3A%22%23000000%22%7D')
})

test('hash should be built 2', () => {
  expect(walnut.utils.urlStringifyHashString({
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
    Version: '6.1',
    ThemeParams: {
      bg_color: '#ffffff',
      button_color: '#40a7e3',
      button_text_color: '#ffffff',
      hint_color: '#999999',
      link_color: '#168acd',
      text_color: '#000000',
    },
  })).toBe('#tgWebAppData=query_id%3DAAGYS5cHAAAAAJhLlwd9TKmN%26user%3D%257B%2522id%2522%253A127355800%252C%2522first_name%2522%253A%2522%25E5%2588%259D%25E9%259F%25B3%2522%252C%2522last_name%2522%253A%2522%25E3%2583%259F%25E3%2582%25AF%2522%252C%2522username%2522%253A%2522miku3920%2522%252C%2522language_code%2522%253A%2522zh-hant%2522%257D%26auth_date%3D1657630177%26hash%3D40f80921d1169a195c9b69a483a10e9c4b0cb31dc69439dd98e257cf59a4d037&tgWebAppVersion=6.1&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22text_color%22%3A%22%23000000%22%7D')
})

test('hash should be built 3', () => {
  expect(walnut.utils.urlStringifyHashString({
    Data: {
      query_id: 'AAGAXhIqAgAAAIBeEipvh4iQ',
      user: {
        id: 127355800,
        first_name: '初音',
        last_name: 'ミク',
        username: 'miku3920',
        language_code: 'zh-hant',
      },
      auth_date: '1657791785',
      token: '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    Version: 6.1,
    ThemeParams: {
      bg_color: '#ffffff',
      button_color: '#40a7e3',
      button_text_color: '#ffffff',
      hint_color: '#999999',
      link_color: '#168acd',
      text_color: '#000000',
    },
    Debug: true,
  })).toBe('#tgWebAppData=query_id%3DAAGAXhIqAgAAAIBeEipvh4iQ%26user%3D%257B%2522id%2522%253A127355800%252C%2522first_name%2522%253A%2522%25E5%2588%259D%25E9%259F%25B3%2522%252C%2522last_name%2522%253A%2522%25E3%2583%259F%25E3%2582%25AF%2522%252C%2522username%2522%253A%2522miku3920%2522%252C%2522language_code%2522%253A%2522zh-hant%2522%257D%26auth_date%3D1657791785%26hash%3D17298137489c38cc26eaa72f4c474d18a24907487223549b3bc1efca27eb87ac&tgWebAppVersion=6.1&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22text_color%22%3A%22%23000000%22%7D&tgWebAppDebug=1')
})
