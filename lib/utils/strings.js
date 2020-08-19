export function isUrl(value) {
  try {
    new URL(value)
  } catch (_) {
    return false
  }
  return true
}
