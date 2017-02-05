import process from './processor'

export default function apply (obj) {

  if (obj.solution.insert.length === 0) return obj.ruler

  const solution = JSON.parse(JSON.stringify(obj.solution))
  const ruler = process(obj.ruler, true)

  const segmentIndex = ruler.findIndex(function (segment) {

    return segment.id === solution.removeSegment

  })

  if (segmentIndex > -1) {

    ruler.splice(segmentIndex, 1)

  }

  ruler.push(...solution.insert)

  return ruler

}
