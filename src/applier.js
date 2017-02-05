import { copy } from './helpers'

export default function apply(__solution__, __ruler__) {
  if (__solution__.insert.length === 0) return __ruler__

  const solution = copy(__solution__)
  const ruler = copy(__ruler__)

  const segmentIndex = ruler.findIndex(
    segment => segment.id === solution.removeSegment
  )

  if (segmentIndex > -1) {
    ruler.splice(segmentIndex, 1)
  }

  ruler.push(...solution.insert)

  return ruler
}
