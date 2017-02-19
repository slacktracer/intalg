import apply from './applier';
import process from './processor';
import solve from './solver';
import test from './tester';
import weld from './welder';

export default function intalg (obj) {

  const conflicts = obj.conflicts || [];

  const intervals = process(obj.intervals);
  let ruler = process(obj.ruler, true);

  if (intervals.length === 0) {

    ruler.sort(function sortRuler (a, b) {

      return a.begin - b.begin;

    });

    return { ruler: process(weld({ ruler })), conflicts };

  }

  const interval = intervals.shift();

  let conflict;
  ruler.some(function (segment) {

    conflict = test({ interval, segment });
    if (conflict) {

      conflicts.push(conflict);

    }
    return conflict;

  });

  if (conflict) {

    const solution = solve(conflict);
    ruler = apply({ solution, ruler });
    intervals.unshift(...solution.create);

  } else {

    ruler.push(interval);

  }

  return intalg({ intervals, ruler, conflicts });

}
