const prefixes = ['webkit', 'moz', 'ms', 'o'] // 各浏览器前缀

let requestAnimationFrame = window.requestAnimationFrame
let cancelAnimationFrame = window.cancelAnimationFrame
let prefix
// 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (let i = 0; i < prefixes.length; i++) {
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    prefix = prefixes[i]
    requestAnimationFrame =
      requestAnimationFrame || (window as any)[prefix + 'RequestAnimationFrame']
    cancelAnimationFrame =
      cancelAnimationFrame ||
      (window as any)[prefix + 'CancelAnimationFrame'] ||
      (window as any)[prefix + 'CancelRequestAnimationFrame']
  }
}

// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime()
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    const id = window.setTimeout(() => {
      callback(currTime)
    }, 1000 / 60)
    return id
  }

  cancelAnimationFrame = function (id) {
    window.clearTimeout(id)
  }
}
const timingFunMap = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
}

export { requestAnimationFrame, cancelAnimationFrame }
