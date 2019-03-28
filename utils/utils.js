// 防抖
export const debounce = (fn, gapTime = 800) => {
  let _lastTime
  return function() {
    clearTimeout(_lastTime)
    _lastTime = setTimeout(() => {
      fn.apply(this, arguments)
    }, gapTime)
  }
}