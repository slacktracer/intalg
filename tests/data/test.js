module.exports = {
  equal: { intervals: [{ begin: 4, end: 20, type: 2 }], ruler: [{ begin: 4, end: 20, type: 0 }] },
  cover: { intervals: [{ begin: 4, end: 20, type: 2 }], ruler: [{ begin: 7, end: 13, type: 0 }] },
  coverLeft: { intervals: [{ begin: 4, end: 20, type: 2 }], ruler: [{ begin: 4, end: 12, type: 0 }] },
  coverRight: { intervals: [{ begin: 4, end: 20, type: 2 }], ruler: [{ begin: 9, end: 20, type: 0 }] },
  inside: { intervals: [{ begin: 4, end: 20, type: 2 }], ruler: [{ begin: 2, end: 28, type: 0 }] },
  insideLeft: { intervals: [{ begin: 4, end: 14, type: 2 }], ruler: [{ begin: 4, end: 20, type: 0 }] },
  insideRight: { intervals: [{ begin: 16, end: 20, type: 2 }], ruler: [{ begin: 4, end: 20, type: 0 }] },
  overlapLeft: { intervals: [{ begin: 4, end: 20, type: 2 }], ruler: [{ begin: 14, end: 32, type: 0 }] },
  overlapRight: { intervals: [{ begin: 4, end: 20, type: 2 }], ruler: [{ begin: 1, end: 11, type: 0 }] }
}
