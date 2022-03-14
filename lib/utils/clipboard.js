import Clipboard from 'clipboard'

export function copyText (text, container) {
  return new Promise(function (resolve, reject) {
    const fakeElement = document.createElement('button')
    // Use the document body as container is no valid object is provided
    container = typeof container === 'object' ? container : document.body
    
    const clipboard = new Clipboard(fakeElement, { text: () => text, container })

    clipboard.on('success', () => {
      clipboard.destroy()
      resolve()
    })

    clipboard.on('error', error => {
      clipboard.destroy()
      reject(error)
    })

    fakeElement.click()
  })
}

export function copyHtml (html, plain) {
  const listener = event => {
    event.clipboardData.setData("text/html", html)
    event.clipboardData.setData("text/plain", plain)
    event.preventDefault()

  }
  document.addEventListener("copy", listener)
  document.execCommand("copy")
  document.removeEventListener("copy", listener)
}
