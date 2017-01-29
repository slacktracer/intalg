function copy(data) {
  return JSON.parse(JSON.stringify(data))
}

function makeInterval(begin, end, type) {
  return { begin, end, type }
}

function markRuler(ruler) {
  return ruler.map((segment, index) => ({
    id: index,
    begin: segment.begin,
    end: segment.end,
    type: segment.type
  }))
}

function unmarkRuler(ruler) {
  return ruler.map(segment => ({
    begin: segment.begin,
    end: segment.end,
    type: segment.type
  }))
}

module.exports = { copy, makeInterval, markRuler, unmarkRuler }
