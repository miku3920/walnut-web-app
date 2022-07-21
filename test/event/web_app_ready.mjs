import walnut from '@/factory.mjs'

test('event should be set', () => {
  expect.assertions(1)

  walnut.event.on('web_app_ready', (e) => {
    expect(e.type).toBe('web_app_ready') // fake expect
  })

  // window.TelegramWebviewProxy.postEvent('web_app_ready', '')
  walnut.event.receive('web_app_ready', '')
})
