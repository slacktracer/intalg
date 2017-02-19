'use strict';

function process(array, identify) {

  return array.map(function (item, index) {

    const processedItem = { begin: item.begin, end: item.end, type: item.type };

    if (identify) {

      processedItem.id = index;
    } else {

      delete processedItem.id;
    }

    return processedItem;
  });
}

function apply(obj) {

  if (obj.solution.insert.length === 0) return obj.ruler;

  const solution = JSON.parse(JSON.stringify(obj.solution));
  const ruler = process(obj.ruler, true);

  const segmentIndex = ruler.findIndex(function (segment) {

    return segment.id === solution.removeSegment;
  });

  if (segmentIndex > -1) {

    ruler.splice(segmentIndex, 1);
  }

  ruler.push(...solution.insert);

  return ruler;
}

function makeInterval(begin, end, type) {

  return { begin, end, type };
}

function solve(conflict) {

  const { interval, name, segment, typeMismatch } = conflict;
  const solution = { create: [], insert: [], removeSegment: false };

  if (typeMismatch) {

    solution.removeSegment = segment.id;
  }

  switch (name) {
    case 'equal':
      if (typeMismatch) {

        solution.insert.push(makeInterval(interval.begin, interval.end, interval.type));
      }
      break;

    case 'cover':
      if (typeMismatch) {

        solution.insert.push(makeInterval(segment.begin, segment.end, interval.type));
      }
      solution.create.push(makeInterval(interval.begin, segment.begin, interval.type), makeInterval(segment.end, interval.end, interval.type));
      break;

    case 'coverLeft':
      if (typeMismatch) {

        solution.insert.push(makeInterval(interval.begin, segment.end, interval.type));
      }
      solution.create.push(makeInterval(segment.end, interval.end, interval.type));
      break;

    case 'coverRight':
      if (typeMismatch) {

        solution.insert.push(makeInterval(segment.begin, interval.end, interval.type));
      }
      solution.create.push(makeInterval(interval.begin, segment.begin, interval.type));
      break;

    case 'inside':
      if (typeMismatch) {

        solution.insert.push(makeInterval(interval.begin, interval.end, interval.type));
        solution.create.push(makeInterval(segment.begin, interval.begin, segment.type), makeInterval(interval.end, segment.end, segment.type));
      }
      break;

    case 'insideLeft':
      if (typeMismatch) {

        solution.insert.push(makeInterval(interval.begin, interval.end, interval.type));
        solution.create.push(makeInterval(interval.end, segment.end, segment.type));
      }
      break;

    case 'insideRight':
      if (typeMismatch) {

        solution.insert.push(makeInterval(interval.begin, interval.end, interval.type));
        solution.create.push(makeInterval(segment.begin, interval.begin, segment.type));
      }
      break;

    case 'overlapLeft':
      if (typeMismatch) {

        solution.insert.push(makeInterval(segment.begin, interval.end, interval.type));
        solution.create.push(makeInterval(interval.end, segment.end, segment.type));
      }
      solution.create.push(makeInterval(interval.begin, segment.begin, interval.type));
      break;

    case 'overlapRight':
      if (typeMismatch) {

        solution.insert.push(makeInterval(interval.begin, segment.end, interval.type));
        solution.create.push(makeInterval(segment.begin, interval.begin, segment.type));
      }
      solution.create.push(makeInterval(segment.end, interval.end, interval.type));
      break;
    default:
      throw new Error({ message: `INVALID CONFLICT NAME: ${name}` });

  }

  return solution;
}

const about = {
  equal: { hit: true, name: 'equal', symbol: '<-------<\n<-------<' },
  cover: { hit: true, name: 'cover', symbol: '<---------<\n <-------< ' },
  coverLeft: {
    hit: true,
    name: 'coverLeft',
    symbol: '<---------<\n<--------< ',
    dummy: true
  },
  coverRight: {
    hit: true,
    name: 'coverRight',
    symbol: '<---------<\n <--------<'
  },
  inside: { hit: true, name: 'inside', symbol: ' <-------< \n<---------<' },
  insideLeft: {
    hit: true,
    name: 'insideLeft',
    symbol: '<--------< \n<---------<'
  },
  insideRight: {
    hit: true,
    name: 'insideRight',
    symbol: ' <--------<\n<---------<'
  },
  overlapLeft: {
    hit: true,
    name: 'overlapLeft',
    symbol: '<---------<\n     <---------<'
  },
  overlapRight: {
    hit: true,
    name: 'overlapRight',
    symbol: '     <---------<\n<---------<'
  },
  outsideLeft: {
    hit: false,
    name: 'outsideLeft',
    symbol: '<---------<\n           <---------<'
  },
  outsideRight: {
    hit: false,
    name: 'outsideRight',
    symbol: '           <---------<\n<---------<'
  }
};

const tests = {
  equal(interval, segment) {

    return interval.begin === segment.begin && interval.end === segment.end;
  },
  cover(interval, segment) {

    return interval.begin < segment.begin && interval.end > segment.end;
  },
  coverLeft(interval, segment) {

    return interval.begin === segment.begin && interval.end > segment.end;
  },
  coverRight(interval, segment) {

    return interval.begin < segment.begin && interval.end === segment.end;
  },
  inside(interval, segment) {

    return interval.begin > segment.begin && interval.end < segment.end;
  },
  insideLeft(interval, segment) {

    return interval.begin === segment.begin && interval.end < segment.end;
  },
  insideRight(interval, segment) {

    return interval.begin > segment.begin && interval.end === segment.end;
  },
  overlapLeft(interval, segment) {

    return interval.begin < segment.begin && interval.end > segment.begin && interval.end < segment.end && interval.end > segment.begin;
  },
  overlapRight(interval, segment) {

    return interval.begin > segment.begin && interval.end > segment.end && interval.begin < segment.end && interval.end > segment.end;
  }
};

const names = Object.keys(tests);

function test(obj) {

  const interval = JSON.parse(JSON.stringify(obj.interval));
  const segment = JSON.parse(JSON.stringify(obj.segment));

  let conflict = false;
  names.some(function (name) {

    const hit = tests[name](interval, segment);
    if (hit) {

      conflict = {
        interval,
        name,
        segment,
        typeMismatch: interval.type !== segment.type,
        about: about[name]
      };
    }
    return hit;
  });
  return conflict;
}

function weld(obj) {

  const ruler = process(obj.ruler);
  const weldedRuler = [ruler.shift()];

  ruler.reduce(function (accumulator, interval) {

    const segment = accumulator[accumulator.length - 1];
    if (segment.end === interval.begin && segment.type === interval.type) {

      segment.end = interval.end;
    } else {

      accumulator.push(interval);
    }
    return accumulator;
  }, weldedRuler);

  return weldedRuler;
}

function intalg(obj) {

  const intervals = process(obj.intervals);
  let ruler = process(obj.ruler, true);

  if (intervals.length === 0) {

    ruler.sort(function sortRuler(a, b) {

      return a.begin - b.begin;
    });

    return process(weld({ ruler }));
  }

  const interval = intervals.shift();

  let conflict;
  ruler.some(function (segment) {

    conflict = test({ interval, segment });
    return conflict;
  });

  if (conflict) {

    const solution = solve(conflict);
    ruler = apply({ solution, ruler });
    intervals.unshift(...solution.create);
  } else {

    ruler.push(interval);
  }

  return intalg({ intervals, ruler });
}

module.exports = intalg;
//# sourceMappingURL=intalg.js.map
