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
    expectedResult: [ { begin: 1, end: 4, type: 0 }, { begin: 4, end: 20, type: 2 } ]
  }
}

import intalg from '../dist/intalg'
import test from 'ava'

test('equal', t => {

  const { expectedResult, intervals, ruler } = data.equal
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'equal is not working')

})

test('cover', t => {

  const { expectedResult, intervals, ruler } = data.cover
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'cover is not working')

})

test('coverLeft', t => {

  const { expectedResult, intervals, ruler } = data.coverLeft
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'coverLeft is not working')

})

test('coverRight', t => {

  const { expectedResult, intervals, ruler } = data.coverRight
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'coverRight is not working')

})

test('inside', t => {

  const { expectedResult, intervals, ruler } = data.inside
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'inside is not working')

})

test('insideLeft', t => {

  const { expectedResult, intervals, ruler } = data.insideLeft
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'insideLeft is not working')

})

test('insideRight', t => {

  const { expectedResult, intervals, ruler } = data.insideRight
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'insideRight is not working')

})

test('overlapLeft', t => {

  const { expectedResult, intervals, ruler } = data.overlapLeft
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'overlapLeft is not working')

})

test('overlapRight', t => {

  const { expectedResult, intervals, ruler } = data.overlapRight
  const result = intalg({ intervals, ruler })
  t.deepEqual(result, expectedResult, 'overlapRight is not working')

})
