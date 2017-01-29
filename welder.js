const { copy } = require('./helpers')

module.exports = function weld(__ruler__) {
  const ruler = copy(__ruler__)
  const weldedRuler = [ ruler.shift() ]

  ruler.reduce(
    (accumulator, segment) => {
      const last = accumulator[accumulator.length - 1]
      console.log(last.end, segment.begin)
      if (last.end === segment.begin && last.type === segment.type) {
        console.log('hmmm')
        last.end = segment.end
      } else {
        accumulator.push(segment)
      }
      return accumulator
    },
    weldedRuler
  )
  return weldedRuler
}
