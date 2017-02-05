import data from './data'
import intalg from '../main'
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
