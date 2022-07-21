import walnut from '@/factory.mjs'

test('data should be stringify 1', () => {
  expect(walnut.utils.dataSafeStringify({
    id: 5000814208,
    first_name: '初音',
    last_name: 'ミク',
    username: 'miku3920',
    language_code: 'zh-hant',
    photo_url: 'https://a-ttgme.stel.com/i/userpic/320/QzCaPKoRQNuVxt5C380lpE3wirX0XmRobkgPmzk5ma9yd7wpSz64DfLCMn6TBe1o.svg',
  })).toBe('{"id":5000814208,"first_name":"初音","last_name":"ミク","username":"miku3920","language_code":"zh-hant","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/QzCaPKoRQNuVxt5C380lpE3wirX0XmRobkgPmzk5ma9yd7wpSz64DfLCMn6TBe1o.svg"}')
})

test('data should be stringify 2', () => {
  expect(walnut.utils.dataSafeStringify({
    id: 3593,
    is_bot: true,
    first_name: 'BotFather',
    last_name: '',
    username: 'botfather',
    photo_url: 'https://a-ttgme.stel.com/i/userpic/320/IXVj0cIEa6e-0VHnsP0AdudAmaQsFavgezL8jLZQD_c.svg',
  })).toBe('{"id":3593,"is_bot":true,"first_name":"BotFather","last_name":"","username":"botfather","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/IXVj0cIEa6e-0VHnsP0AdudAmaQsFavgezL8jLZQD_c.svg"}')
})
