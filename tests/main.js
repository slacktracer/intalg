const data = {
  equal: {
    intervals: [ { begin: 4, end: 20, type: 2 } ],
    ruler: [ { begin: 4, end: 20, type: 0 } ],
    expectedResult: [ { begin: 4, end: 20, type: 2 } ]
  },
  cover: {
    intervals: [ { begin: 4, end: 20, type: 2 } ],
    ruler: [ { begin: 7, end: 13, type: 0 } ],
    expectedResult: [ { begin: 4, end: 20, type: 2 } ]
  },
  coverLeft: {
    intervals: [ { begin: 4, end: 20, type: 2 } ],
    ruler: [ { begin: 4, end: 12, type: 0 } ],
    expectedResult: [ { begin: 4, end: 20, type: 2 } ]
  },
  coverRight: {
    intervals: [ { begin: 4, end: 20, type: 2 } ],
    ruler: [ { begin: 9, end: 20, type: 0 } ],
    expectedResult: [ { begin: 4, end: 20, type: 2 } ]
  },
  inside: {
    intervals: [ { begin: 4, end: 20, type: 2 } ],
    ruler: [ { begin: 2, end: 28, type: 0 } ],
    expectedResult: [
      { begin: 2, end: 4, type: 0 },
      { begin: 4, end: 20, type: 2 },
      { begin: 20, end: 28, type: 0 }
    ]
  },
  insideLeft: {
    intervals: [ { begin: 4, end: 14, type: 2 } ],
    ruler: [ { begin: 4, end: 20, type: 0 } ],
    expectedResult: [
      { begin: 4, end: 14, type: 2 },
      { begin: 14, end: 20, type: 0 }
    ]
  },
  insideRight: {
    intervals: [ { begin: 16, end: 20, type: 2 } ],
    ruler: [ { begin: 4, end: 20, type: 0 } ],
    expectedResult: [
      { begin: 4, end: 16, type: 0 },
      { begin: 16, end: 20, type: 2 }
    ]
  },
  overlapLeft: {
    intervals: [ { begin: 4, end: 20, type: 2 } ],
    ruler: [ { begin: 14, end: 32, type: 0 } ],
    expectedResult: [
      { begin: 4, end: 20, type: 2 },
      { begin: 20, end: 32, type: 0 }
    ]
  },
  overlapRight: {
    intervals: [ { begin: 4, end: 20, type: 2 } ],
    ruler: [ { begin: 1, end: 11, type: 0 } ],
    expectedResult: [
      { begin: 1, end: 4, type: 0 },
      { begin: 4, end: 20, type: 2 }
    ]
  }
};

import intalg from '../dist/intalg';
import test from 'ava';

test('solve for equal', t => {

  const { expectedResult, intervals, ruler } = data.equal;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'equal is not working');

});
test('solve for cover', t => {

  const { expectedResult, intervals, ruler } = data.cover;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'cover is not working');

});

test('solve for coverLeft', t => {

  const { expectedResult, intervals, ruler } = data.coverLeft;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'coverLeft is not working');

});

test('solve for coverRight', t => {

  const { expectedResult, intervals, ruler } = data.coverRight;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'coverRight is not working');

});

test('solve for inside', t => {

  const { expectedResult, intervals, ruler } = data.inside;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'inside is not working');

});

test('solve for insideLeft', t => {

  const { expectedResult, intervals, ruler } = data.insideLeft;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'insideLeft is not working');

});

test('solve for insideRight', t => {

  const { expectedResult, intervals, ruler } = data.insideRight;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'insideRight is not working');

});

test('solve for overlapLeft', t => {

  const { expectedResult, intervals, ruler } = data.overlapLeft;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'overlapLeft is not working');

});

test('solve for overlapRight', t => {

  const { expectedResult, intervals, ruler } = data.overlapRight;
  const { ruler: result } = intalg({ intervals, ruler });
  t.deepEqual(result, expectedResult, 'overlapRight is not working');

});

test('preserve type', t => {

  const ruler = [
    { begin: 1, end: 15, type: 'free' },
    { begin: 20, end: 30, type: 'preserved' },
    { begin: 30, end: 40, type: 'free' },
    { begin: 40, end: 45, type: 'free' }
  ];

  const intervals = [ { begin: 13, end: 33, type: 'used' } ];

  const expectedResult = [
    { begin: 1, end: 13, type: 'free' },
    { begin: 13, end: 20, type: 'used' },
    { begin: 20, end: 30, type: 'preserved' },
    { begin: 30, end: 33, type: 'used' },
    { begin: 33, end: 45, type: 'free' }
  ];

  const { ruler: result } = intalg({
    intervals,
    ruler,
    preserve: [ 'preserved' ]
  });
  t.deepEqual(result, expectedResult, 'preserving type is not working');

});

test('fail on type', t => {

  const ruler = [
    { begin: 1, end: 15, type: 'free' },
    { begin: 20, end: 30, type: 'used' },
    { begin: 30, end: 40, type: 'free' },
    { begin: 40, end: 45, type: 'free' }
  ];

  const intervals = [ { begin: 13, end: 33, type: 'some other type' } ];

  const error = t.throws(function () {

    intalg({
      intervals,
      ruler,
      fail: [ 'used' ]
    });

  });

  t.is(error.message, 'Failed on used!');

});
