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

export const tests = {
  equal (interval, segment) {

    return interval.begin === segment.begin && interval.end === segment.end;

  },
  cover (interval, segment) {

    return interval.begin < segment.begin && interval.end > segment.end;

  },
  coverLeft (interval, segment) {

    return interval.begin === segment.begin && interval.end > segment.end;

  },
  coverRight (interval, segment) {

    return interval.begin < segment.begin && interval.end === segment.end;

  },
  inside (interval, segment) {

    return interval.begin > segment.begin && interval.end < segment.end;

  },
  insideLeft (interval, segment) {

    return interval.begin === segment.begin && interval.end < segment.end;

  },
  insideRight (interval, segment) {

    return interval.begin > segment.begin && interval.end === segment.end;

  },
  overlapLeft (interval, segment) {

    return interval.begin < segment.begin &&
      interval.end > segment.begin &&
      interval.end < segment.end &&
      interval.end > segment.begin;

  },
  overlapRight (interval, segment) {

    return interval.begin > segment.begin &&
      interval.end > segment.end &&
      interval.begin < segment.end &&
      interval.end > segment.end;

  }
};

const names = Object.keys(tests);

export default function test (obj) {

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
