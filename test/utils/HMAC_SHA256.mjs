import walnut from '@/factory.mjs'

test('HMAC_SHA256 should be correct 1', () => {
  expect(walnut.utils.HMAC_SHA256(
    'auth_date=1657791785\nquery_id=AAGAXhIqAgAAAIBeEipvh4iQ\nreceiver={"id":3593,"is_bot":true,"first_name":"BotFather","last_name":"","username":"botfather","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/IXVj0cIEa6e-0VHnsP0AdudAmaQsFavgezL8jLZQD_c.svg"}\nuser={"id":5000814208,"first_name":"初音","last_name":"ミク","username":"miku3920","language_code":"zh-hant","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/QzCaPKoRQNuVxt5C380lpE3wirX0XmRobkgPmzk5ma9yd7wpSz64DfLCMn6TBe1o.svg"}',
    walnut.utils.HMAC_SHA256('1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'WebAppData'),
    true,
  )).toBe('9fe67e5d3d22f8342348dd40c1cad747908d3636708c9267e8eebf02f2af7688')
})

test('HMAC_SHA256 should be correct 2', () => {
  expect(walnut.utils.HMAC_SHA256('1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'WebAppData', true)).toBe('4ea9551eadacad56f4ee59315d97054f8feec95ddf4f4eb1567130d1e8ae27a7')
})
