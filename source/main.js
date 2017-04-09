import apply from './applier';
import process from './processor';
import solve from './solver';
import test from './tester';
import weld from './welder';

export { test };

export default function intalg (
  { intervals = [], ruler = [], preserve = [], fail = [] }
) {

  intervals = process(intervals);
  ruler = process(ruler, true);

  if (intervals.length === 0) {

    ruler.sort(function sortRuler (a, b) {

      return a.begin - b.begin;

    });

    return { ruler: process(weld({ ruler })) };

  }

  const interval = intervals.shift();

  let conflict;
  ruler.some(function (segment) {

    conflict = test({ interval, segment });

    if (fail.includes(segment.type)) {

      throw new Error(`Failed on ${segment.type}!`);

    }

    return conflict;

  });

  if (conflict) {

    const solution = solve(conflict, preserve);
    ruler = apply({ solution, ruler });
    intervals.unshift(...solution.create);

  } else {

    ruler.push(interval);

  }

  return intalg({ intervals, ruler, preserve, fail });

}
