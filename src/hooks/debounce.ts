export function debounce(f: () => void, ms: number = 1000) {
  let timer: ReturnType<typeof setTimeout> // More flexible typing
  return function () {
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = setTimeout(f, ms)
  }
}
