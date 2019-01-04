import Clipboard from 'clipboard'

export function copyText (text, container) {
  return new Promise(function (resolve, reject) {
    var fakeElement = document.createElement('button')

    var clipboard = new Clipboard(fakeElement, {
      text: () => (text),
      action: () => ('copy'),
      container: typeof container === 'object' ? container : document.body
    })

    clipboard.on('success', error => {
      clipboard.destroy()
      resolve(error)
    })

    clipboard.on('error', error => {
      clipboard.destroy()
      reject(error)
    })

    fakeElement.click()
  })
}
