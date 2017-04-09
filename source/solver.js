import makeInterval from './intervalMaker';

export default function solve (conflict, preserve) {

  const { interval, name, segment, typeMismatch } = conflict;

  const solution = { create: [], insert: [], removeSegment: false };

  const create = makeCreateFunction(solution.create);

  const unprotectedType = !preserve.includes(segment.type);

  const insert = makeInsertFunction(solution.insert, unprotectedType);

  if (typeMismatch && unprotectedType) {

    solution.removeSegment = segment.id;

  }

  switch (name) {
  case 'equal':
    if (typeMismatch) {

      insert(makeInterval(interval.begin, interval.end, interval.type));

    }

    break;

  case 'cover':
    if (typeMismatch) {

      insert(makeInterval(segment.begin, segment.end, interval.type));

    }

    create(
        makeInterval(interval.begin, segment.begin, interval.type),
        makeInterval(segment.end, interval.end, interval.type)
      );

    break;

  case 'coverLeft':
    if (typeMismatch) {

      insert(makeInterval(interval.begin, segment.end, interval.type));

    }

    create(makeInterval(segment.end, interval.end, interval.type));

    break;

  case 'coverRight':
    if (typeMismatch) {

      insert(makeInterval(segment.begin, interval.end, interval.type));

    }

    create(makeInterval(interval.begin, segment.begin, interval.type));

    break;

  case 'inside':
    if (typeMismatch) {

      insert(makeInterval(interval.begin, interval.end, interval.type));

      create(
          makeInterval(segment.begin, interval.begin, segment.type),
          makeInterval(interval.end, segment.end, segment.type)
        );

    }

    break;

  case 'insideLeft':
    if (typeMismatch) {

      insert(makeInterval(interval.begin, interval.end, interval.type));

      create(makeInterval(interval.end, segment.end, segment.type));

    }

    break;

  case 'insideRight':
    if (typeMismatch) {

      insert(makeInterval(interval.begin, interval.end, interval.type));

      create(makeInterval(segment.begin, interval.begin, segment.type));

    }

    break;

  case 'overlapLeft':
    if (typeMismatch) {

      insert(makeInterval(segment.begin, interval.end, interval.type));

      create(makeInterval(interval.end, segment.end, segment.type));

    }

    create(makeInterval(interval.begin, segment.begin, interval.type));

    break;

  case 'overlapRight':
    if (typeMismatch) {

      insert(makeInterval(interval.begin, segment.end, interval.type));

      create(makeInterval(segment.begin, interval.begin, segment.type));

    }

    create(makeInterval(segment.end, interval.end, interval.type));

    break;

  default:
    throw new Error({ message: `INVALID CONFLICT NAME: ${name}` });

  }

  return solution;

}

function makeCreateFunction (array) {

  return function create (...interval) {

    array.push(...interval);

  };

}

function makeInsertFunction (array, execute) {

  return function insert (...interval) {

    if (execute) {

      array.push(...interval);

    }

  };

}
