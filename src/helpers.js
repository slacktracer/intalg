export function copy(data) {
  return JSON.parse(JSON.stringify(data))
}

export function makeInterval(begin, end, type) {
  return { begin, end, type }
}

export function markRuler(ruler) {
  return ruler.map((segment, index) => ({
    id: index,
    begin: segment.begin,
    end: segment.end,
    type: segment.type
  }))
}

export function unmarkRuler(ruler) {
  return ruler.map(segment => ({
    begin: segment.begin,
    end: segment.end,
    type: segment.type
  }))
}
