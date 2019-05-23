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
// 上传图片
export const uploadImg = (
  uploadurl,
  filePath,
  name = 'file',
  fn = () => {},
  rest = {}
) => {
  WxLoading('图片上传中...')
  wx.uploadFile({
    url: `${BASE_API}${uploadurl}`,
    filePath,
    name,
    formData: rest,
    header: {
      accept: 'application/json'
    },
    success: () => {}
  })
}
