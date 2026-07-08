import assert from 'node:assert/strict'
import {
  appendLogLines,
  prependLogLines,
  shouldLoadPreviousSegment,
  isPinnedToBottom,
} from '../src/utils/logWindow.mjs'

function testAppendTrimsHiddenTopWhenPinnedToBottom() {
  const result = appendLogLines(['1', '2', '3'], ['4', '5', '6'], 4)
  assert.deepEqual(result.lines, ['3', '4', '5', '6'])
  assert.equal(result.droppedFromTop, 2)
}

function testAppendDoesNotGrowUnboundedWhenUserReadingMiddle() {
  const result = appendLogLines(['1', '2', '3'], ['4', '5', '6'], 4, { pinnedToBottom: false })
  assert.deepEqual(result.lines, ['1', '2', '3'])
  assert.equal(result.pendingNewLines, 3)
}

function testPrependKeepsWindowBoundedAroundScrollLocation() {
  const result = prependLogLines(['old1', 'old2', 'old3'], ['cur1', 'cur2', 'cur3'], 5)
  assert.deepEqual(result.lines, ['old1', 'old2', 'old3', 'cur1', 'cur2'])
  assert.equal(result.droppedFromBottom, 1)
}

function testScrollThresholds() {
  assert.equal(shouldLoadPreviousSegment({ scrollTop: 20 }), true)
  assert.equal(shouldLoadPreviousSegment({ scrollTop: 200 }), false)
  assert.equal(isPinnedToBottom({ scrollTop: 900, scrollHeight: 1000, clientHeight: 80 }), true)
  assert.equal(isPinnedToBottom({ scrollTop: 100, scrollHeight: 1000, clientHeight: 80 }), false)
}

for (const test of [
  testAppendTrimsHiddenTopWhenPinnedToBottom,
  testAppendDoesNotGrowUnboundedWhenUserReadingMiddle,
  testPrependKeepsWindowBoundedAroundScrollLocation,
  testScrollThresholds,
]) {
  test()
}
console.log('logWindow tests passed')
