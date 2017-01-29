/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const ranger = require('./main')
const intervals = require('./data/intervals')
const ruler = require('./data/ruler')

const updatedRuler = ranger(intervals, ruler)

console.log(updatedRuler)
