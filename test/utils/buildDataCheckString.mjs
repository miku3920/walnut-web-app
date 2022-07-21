import walnut from '@/factory.mjs'

test('data check string should be built', () => {
  expect(walnut.utils.buildDataCheckString({
    query_id: 'AAGAXhIqAgAAAIBeEipvh4iQ',
    user: '{"id":5000814208,"first_name":"初音","last_name":"ミク","username":"miku3920","language_code":"zh-hant","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/QzCaPKoRQNuVxt5C380lpE3wirX0XmRobkgPmzk5ma9yd7wpSz64DfLCMn6TBe1o.svg"}',
    receiver: '{"id":3593,"is_bot":true,"first_name":"BotFather","last_name":"","username":"botfather","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/IXVj0cIEa6e-0VHnsP0AdudAmaQsFavgezL8jLZQD_c.svg"}',
    auth_date: '1657791785',
  })).toBe('auth_date=1657791785\nquery_id=AAGAXhIqAgAAAIBeEipvh4iQ\nreceiver={"id":3593,"is_bot":true,"first_name":"BotFather","last_name":"","username":"botfather","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/IXVj0cIEa6e-0VHnsP0AdudAmaQsFavgezL8jLZQD_c.svg"}\nuser={"id":5000814208,"first_name":"初音","last_name":"ミク","username":"miku3920","language_code":"zh-hant","photo_url":"https:\\/\\/a-ttgme.stel.com\\/i\\/userpic\\/320\\/QzCaPKoRQNuVxt5C380lpE3wirX0XmRobkgPmzk5ma9yd7wpSz64DfLCMn6TBe1o.svg"}')
})
