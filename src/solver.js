import makeInterval from './intervalMaker'

export default function solve (conflict) {

  const { interval, name, segment, typeMismatch } = conflict
  const solution = { create: [], insert: [], removeSegment: false }

  if (typeMismatch) {

    solution.removeSegment = segment.id

  }

  switch (name) {
    case 'equal':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(interval.begin, interval.end, interval.type)
        )

      }
      break

    case 'cover':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(segment.begin, segment.end, interval.type)
        )

      }
      solution.create.push(
        makeInterval(interval.begin, segment.begin, interval.type),
        makeInterval(segment.end, interval.end, interval.type)
      )
      break

    case 'coverLeft':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(interval.begin, segment.end, interval.type)
        )

      }
      solution.create.push(
        makeInterval(segment.end, interval.end, interval.type)
      )
      break

    case 'coverRight':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(segment.begin, interval.end, interval.type)
        )

      }
      solution.create.push(
        makeInterval(interval.begin, segment.begin, interval.type)
      )
      break

    case 'inside':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(interval.begin, interval.end, interval.type)
        )
        solution.create.push(
          makeInterval(segment.begin, interval.begin, segment.type),
          makeInterval(interval.end, segment.end, segment.type)
        )

      }
      break

    case 'insideLeft':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(interval.begin, interval.end, interval.type)
        )
        solution.create.push(
          makeInterval(interval.end, segment.end, segment.type)
        )

      }
      break

    case 'insideRight':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(interval.begin, interval.end, interval.type)
        )
        solution.create.push(
          makeInterval(segment.begin, interval.begin, segment.type)
        )

      }
      break

    case 'overlapLeft':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(segment.begin, interval.end, interval.type)
        )
        solution.create.push(
          makeInterval(interval.end, segment.end, segment.type)
        )

      }
      solution.create.push(
        makeInterval(interval.begin, segment.begin, interval.type)
      )
      break

    case 'overlapRight':
      if (typeMismatch) {

        solution.insert.push(
          makeInterval(interval.begin, segment.end, interval.type)
        )
        solution.create.push(
          makeInterval(segment.begin, interval.begin, segment.type)
        )

      }
      solution.create.push(
        makeInterval(segment.end, interval.end, interval.type)
      )
      break
    default:
      throw new Error({ message: `INVALID CONFLICT NAME: ${name}` })

  }

  return solution

}
