export default {
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
