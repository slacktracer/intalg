/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const ranger = require('../main')
const data = require('./data/test')

console.log('\xA7')
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')

Object.keys(data).forEach((key) => {
  const intervals = data[key].intervals
  const ruler = data[key].ruler

  console.log('====================')
  console.log('')
  console.log(`Testing for ${key}`)
  console.log('')

  console.log('Intervals')
  console.log(intervals)
  console.log('')
  console.log('')
  console.log('Ruler')
  console.log(ruler)
  console.log('')
  console.log('')

  console.log('Starting. Conflicts:')
  console.log('')

  const updatedRuler = ranger(intervals, ruler)

  console.log('')
  console.log('')
  console.log('Updated Ruler')
  console.log(updatedRuler)
  console.log('')
  console.log('')
  console.log('')
})
