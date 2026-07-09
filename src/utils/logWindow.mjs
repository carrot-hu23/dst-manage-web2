export const DEFAULT_LOG_SEGMENT_SIZE = 300
export const DEFAULT_MAX_VISIBLE_LOG_LINES = 1200
export const LOAD_PREVIOUS_SCROLL_THRESHOLD = 80
export const BOTTOM_SCROLL_THRESHOLD = 80

export function appendLogLines(currentLines, newLines, maxVisibleLines = DEFAULT_MAX_VISIBLE_LOG_LINES, options = {}) {
  const pinnedToBottom = options.pinnedToBottom !== false
  const incoming = Array.isArray(newLines) ? newLines.filter(line => line !== undefined && line !== null) : []
  if (!pinnedToBottom) {
    return {
      lines: currentLines,
      droppedFromTop: 0,
      pendingNewLines: incoming.length,
    }
  }

  const merged = [...currentLines, ...incoming]
  const dropCount = Math.max(0, merged.length - maxVisibleLines)
  return {
    lines: dropCount > 0 ? merged.slice(dropCount) : merged,
    droppedFromTop: dropCount,
    pendingNewLines: 0,
  }
}

export function prependLogLines(previousLines, currentLines, maxVisibleLines = DEFAULT_MAX_VISIBLE_LOG_LINES) {
  const incoming = Array.isArray(previousLines) ? previousLines.filter(line => line !== undefined && line !== null) : []
  const merged = [...incoming, ...currentLines]
  const dropCount = Math.max(0, merged.length - maxVisibleLines)
  return {
    lines: dropCount > 0 ? merged.slice(0, maxVisibleLines) : merged,
    droppedFromBottom: dropCount,
  }
}

export function shouldLoadPreviousSegment(scroll, threshold = LOAD_PREVIOUS_SCROLL_THRESHOLD) {
  if (!scroll) return false
  return Number(scroll.scrollTop || 0) <= threshold
}

export function isPinnedToBottom(scroll, threshold = BOTTOM_SCROLL_THRESHOLD) {
  if (!scroll) return true
  const scrollTop = Number(scroll.scrollTop || 0)
  const scrollHeight = Number(scroll.scrollHeight || 0)
  const clientHeight = Number(scroll.clientHeight || 0)
  return scrollHeight - scrollTop - clientHeight <= threshold
}
