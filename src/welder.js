import process from './processor'

export default function weld (obj) {

  const ruler = process(obj.ruler)
  const weldedRuler = [ ruler.shift() ]

  ruler.reduce(
    function (accumulator, interval) {

      const segment = accumulator[accumulator.length - 1]
      if (segment.end === interval.begin && segment.type === interval.type) {

        segment.end = interval.end

      } else {

        accumulator.push(interval)

      }
      return accumulator

    },
    weldedRuler
  )

  return weldedRuler

}
