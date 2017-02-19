'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var intalg = function () {
  'use strict';

  function process(array, identify) {

    return array.map(function (item, index) {

      var processedItem = { begin: item.begin, end: item.end, type: item.type };

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

    var solution = JSON.parse(JSON.stringify(obj.solution));
    var ruler = process(obj.ruler, true);

    var segmentIndex = ruler.findIndex(function (segment) {

      return segment.id === solution.removeSegment;
    });

    if (segmentIndex > -1) {

      ruler.splice(segmentIndex, 1);
    }

    ruler.push.apply(ruler, _toConsumableArray(solution.insert));

    return ruler;
  }

  function makeInterval(begin, end, type) {

    return { begin: begin, end: end, type: type };
  }

  function solve(conflict) {
    var interval = conflict.interval,
        name = conflict.name,
        segment = conflict.segment,
        typeMismatch = conflict.typeMismatch;

    var solution = { create: [], insert: [], removeSegment: false };

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
        throw new Error({ message: 'INVALID CONFLICT NAME: ' + name });

    }

    return solution;
  }

  var about = {
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

  var tests = {
    equal: function equal(interval, segment) {

      return interval.begin === segment.begin && interval.end === segment.end;
    },
    cover: function cover(interval, segment) {

      return interval.begin < segment.begin && interval.end > segment.end;
    },
    coverLeft: function coverLeft(interval, segment) {

      return interval.begin === segment.begin && interval.end > segment.end;
    },
    coverRight: function coverRight(interval, segment) {

      return interval.begin < segment.begin && interval.end === segment.end;
    },
    inside: function inside(interval, segment) {

      return interval.begin > segment.begin && interval.end < segment.end;
    },
    insideLeft: function insideLeft(interval, segment) {

      return interval.begin === segment.begin && interval.end < segment.end;
    },
    insideRight: function insideRight(interval, segment) {

      return interval.begin > segment.begin && interval.end === segment.end;
    },
    overlapLeft: function overlapLeft(interval, segment) {

      return interval.begin < segment.begin && interval.end > segment.begin && interval.end < segment.end && interval.end > segment.begin;
    },
    overlapRight: function overlapRight(interval, segment) {

      return interval.begin > segment.begin && interval.end > segment.end && interval.begin < segment.end && interval.end > segment.end;
    }
  };

  var names = Object.keys(tests);

  function test(obj) {

    var interval = JSON.parse(JSON.stringify(obj.interval));
    var segment = JSON.parse(JSON.stringify(obj.segment));

    var conflict = false;
    names.some(function (name) {

      var hit = tests[name](interval, segment);
      if (hit) {

        conflict = {
          interval: interval,
          name: name,
          segment: segment,
          typeMismatch: interval.type !== segment.type,
          about: about[name]
        };
      }
      return hit;
    });
    return conflict;
  }

  function weld(obj) {

    var ruler = process(obj.ruler);
    var weldedRuler = [ruler.shift()];

    ruler.reduce(function (accumulator, interval) {

      var segment = accumulator[accumulator.length - 1];
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

    var intervals = process(obj.intervals);
    var ruler = process(obj.ruler, true);

    if (intervals.length === 0) {

      ruler.sort(function sortRuler(a, b) {

        return a.begin - b.begin;
      });

      return process(weld({ ruler: ruler }));
    }

    var interval = intervals.shift();

    var conflict = void 0;
    ruler.some(function (segment) {

      conflict = test({ interval: interval, segment: segment });
      return conflict;
    });

    if (conflict) {

      var solution = solve(conflict);
      ruler = apply({ solution: solution, ruler: ruler });
      intervals.unshift.apply(intervals, _toConsumableArray(solution.create));
    } else {

      ruler.push(interval);
    }

    return intalg({ intervals: intervals, ruler: ruler });
  }

  return intalg;
}();
//# sourceMappingURL=intalg.js.map
