import walnut from '@/factory.mjs'

// eslint-disable-next-line no-console
console.log(process.env.TYPE || 'no type')
const check = ((process.env.TYPE || '').indexOf('Default') === -1) ? 'toBeDefined' : 'toBeUndefined'

test('Import all exported members should have default', () => {
  // Import default export should not have default
  expect(walnut.default)[check]()
})

test('walnut should be defined', () => {
  expect(walnut).toBeDefined()
})

test('utils should be defined', () => {
  expect(walnut.utils).toBeDefined()
})

test('event should be defined', () => {
  expect(walnut.event).toBeDefined()
})
