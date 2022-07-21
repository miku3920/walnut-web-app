const fs = require('fs')
const path = require('path')

const data = fs.readFileSync(path.join(__dirname, '../dist/walnut.js'), 'utf8')
const search = fs.readFileSync(path.join(__dirname, './search.txt'), 'utf8')
const replace = fs.readFileSync(path.join(__dirname, './replace.txt'), 'utf8')
const dataFix = data.replace(search, replace)

// eslint-disable-next-line no-console
console.log('\n', data.substring(0, 352), '\n', dataFix.substring(0, 331))

fs.writeFileSync(path.join(__dirname, '../dist/walnut.js'), dataFix)

const dataMin = fs.readFileSync(path.join(__dirname, '../dist/walnut.min.js'), 'utf8')
const searchMin = fs.readFileSync(path.join(__dirname, './search.min.txt'), 'utf8')
const replaceMin = fs.readFileSync(path.join(__dirname, './replace.min.txt'), 'utf8')
const dataFixMin = dataMin.replace(searchMin, replaceMin)

fs.writeFileSync(path.join(__dirname, '../dist/walnut.min.js'), dataFixMin)

// eslint-disable-next-line no-console
console.log('\n', dataMin.substring(0, 204), '\n', dataFixMin.substring(0, 207))
