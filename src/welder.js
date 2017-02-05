import { copy } from './helpers'

export default function weld(__ruler__) {
  const ruler = copy(__ruler__)
  const weldedRuler = [ ruler.shift() ]
  ruler.reduce(
    function(accumulator, segment) {
      const last = accumulator[accumulator.length - 1]
      if (last.end === segment.begin && last.type === segment.type) {
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
