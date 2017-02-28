#### UPDATE (2017-02-28):

- Added type preservation. Selected types won't be touched.

The test:

```
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

```

- Added "fail on type". If there is a conflict with a "failing type" intalg throws.

The test:

```
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

```

TODO:

- Create an API.md.
- Decide on a final API for 1.0. (intalg(), intalg.testSomething(), intalg.is(interval, type)?)

___

It's like a flat interval tree! (_What?_)

## "SHOW ME WHAT YOU GOT!"

You have an array of intervals, each interval has a type.

_Do I?_

Yes you do. Like this:

```
const ruler = [
  { begin: 1, end: 9, type: 0 },
  { begin: 9, end: 14, type: 0 },
  { begin: 14, end: 23, type: 0 },
  { begin: 29, end: 39, type: 0 },
  { begin: 39, end: 41, type: 0 },
  { begin: 45, end: 49, type: 0 },
  { begin: 49, end: 60, type: 0 },
  { begin: 60, end: 92, type: 0 },
  { begin: 92, end: 100, type: 0 }
]
```

You can simplify it, and you will:

```
const ruler = [
  { begin: 1, end: 23, type: 0 },
  { begin: 29, end: 41, type: 0 },
  { begin: 45, end: 100, type: 0 }
]
```

_Ok. So what?_

Well then, now you have some new intervals. They may or may not overlap with the old ones and be of a different (or the same) type.

And you want to meld then. Here they are:

```
const intervals = [
  { begin: 4, end: 30, type: 0 },
  { begin: 38, end: 43, type: 'fun' },
  { begin: 56, end: 78, type: false }
]
```

In the end you wanna have this:

```
[
  { begin: 1, end: 38, type: 0 },
  { begin: 38, end: 43, type: 'fun' },
  { begin: 45, end: 56, type: 0 },
  { begin: 56, end: 78, type: false },
  { begin: 78, end: 100, type: 0 }
]
```

All you need is the amazing **Interval Melder** lib.

_I thought it's called **level**..._

It's a work in progress!

Anyway, you just have to:

```
const level = require('level')
const a_new_ruler = level(intervals, ruler)
// [
//   { begin: 1, end: 38, type: 0 },
//   { begin: 38, end: 43, type: 'fun' },
//   { begin: 45, end: 56, type: 0 },
//   { begin: 56, end: 78, type: false },
//   { begin: 78, end: 100, type: 0 }
// ]
```

Easy Peasy, Lemon Squeezy...

_Ok. I fail to see how it's useful though..._

You just... just... just let me have this, ok?

_¬¬_

## _Fine, tell me more_

So, it's a bit like you have flattened an [interval tree](https://en.wikipedia.org/wiki/Interval_tree).

I like to call what it does "Interval Algebra".

_Sounds pretentious._

You just... Alright?

### Let's see a Real Life(TM) example

Say you find yourself not using your Halligan bar as much lately. You decide to rent it for the next month. (This sharing economy thing is all the rage these days.)

You have your first interval:

```
const freeDays = [ { begin: 1, end: 30, type: 'free' } ]
```

Soon you receive a bunch of calls (it looks like a post-apocalyptic zombieful wasteland out there, everybody seems to be in dire need of a Halligan bar).

Now you have this:

```
const reservedDays = [
  { begin: 5, end: 13, type: 'alfa' },
  { begin: 15, end: 16, type: 'bravo' },
  { begin: 20, end: 23, type: 'charlie' },
  { begin: 1, end: 5, type: 'delta' }
]
```

And then you just:

```
const level = require('level')
const schedule = level(reservedDays, freeDays)
// [
//   { begin: 1, end: 5, type: 'delta' },
//   { begin: 5, end: 13, type: 'alfa' },
//   { begin: 13, end: 15, type: 'free' },
//   { begin: 15, end: 16, type: 'bravo' },
//   { begin: 16, end: 20, type: 'free' },
//   { begin: 20, end: 23, type: 'charlie' },
//   { begin: 23, end: 30, type: 'free' }
// ]
```

Voilá! Kaput! \o/

_Doesn't kaput means broken?_

We're done here.

### _Now what?_

Go ahead and ```npm install intalg```.

_intalg?_

**IntAlg**, capital I, capital A. **level** was taken. Of course.

_I see. For interval algebra. Isn't it more like interval arithmetics?_

Maybe. I honestly don't know. Anyway, it's also [taken already](https://en.wikipedia.org/wiki/Interval_arithmetic).

### Next!

- Blocking types.
- A lot of refactoring.
- Some thinking and then decide how to evolve it.


## "I like what you got! Good job!"

It is not done. It can be used, but be careful if you do.

It's more like a proof of concept right now. I just had to release it as it is. Create this repository so I can comeback to it next week with the feeling I already have something nice I can make better.

Thanks for listening.
