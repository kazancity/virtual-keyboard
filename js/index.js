import enKbd from './en.js'
import ruKbd from './ru.js'

const codeSet = {
  AltLeft: false,
  AltRight: false,
  ControlLeft: false,
  ControlRight: false,
}

let lang = 'eng'
let language = enKbd
let caps = false
let capsSwitch = false
let shiftCaps = false
let shiftSwitch = false
let intervalSwitchLang
let switchedLanguage = false

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lang', lang)
  localStorage.setItem('caps', caps)
})

window.addEventListener('load', () => {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang')
  }
  if (localStorage.getItem('caps') === 'true') {
    caps = true
  }
})

function writeText(content) {
  const text = document.querySelector('.text')
  const start = text.selectionStart
  const end = text.selectionEnd
  if (caps) {
    content.toUpperCase()
  } else {
    content.toLowerCase()
  }
  text.textContent =
    text.value.substring(0, start) + content + text.value.substring(end)
  text.focus()
  text.setSelectionRange(start + 1, start + 1)
}

function textUp(e) {
  e.textContent = e.textContent.toLowerCase()
  document.querySelector('.green').setAttribute('style', 'display:none;')
}

function textLow(e) {
  e.textContent = e.textContent.toUpperCase()
  document.querySelector('.green').removeAttribute('style')
}

function toUpToLow() {
  let index = 0
  if (!caps) {
    document.querySelectorAll('.value').forEach((el) => {
      index += 1
      if (index < 51) {
        textUp(el)
      }
    })
  } else {
    document.querySelectorAll('.value').forEach((el) => {
      index += 1
      if (index < 51) {
        textLow(el)
      }
    })
  }
}

function keyDelete() {
  const text = document.querySelector('.text')
  const start = text.selectionStart
  const end = text.selectionEnd
  if (start === end) {
    text.textContent =
      text.value.substring(0, start) + text.value.substring(start + 1)
  } else {
    text.textContent =
      text.value.substring(0, start) + text.value.substring(end)
  }
  text.focus()
  text.setSelectionRange(start, start)
}

function keyBackspace() {
  const text = document.querySelector('.text')
  const start = text.selectionStart
  const end = text.selectionEnd
  if (start === end) {
    text.textContent =
      text.value.substring(0, start - 1) + text.value.substring(end)
    text.setSelectionRange(start - 1, start - 1)
  } else {
    text.textContent =
      text.value.substring(0, start) + text.value.substring(end)
    text.setSelectionRange(start, start)
  }
  text.focus()
}

function setKeyboardOnLoad() {
  if (lang === 'rus') {
    language = ruKbd
  } else {
    language = enKbd
  }

  const divRowsWrapper = document.createElement('div')
  divRowsWrapper.classList.add('keyboard-wrapper')
  document.querySelector('.container').append(divRowsWrapper)
  Object.keys(language).forEach((keys) => {
    if (keys === '0') {
      const divRow = document.createElement('div')
      divRow.classList.add('row-key', 'row-first')
      divRowsWrapper.append(divRow)

      Object.keys(language[keys]).forEach((key) => {
        const divKey = document.createElement('div')
        divKey.classList.add('key', 'key-short', `${language[keys][key].class}`)
        if (language[keys][key].extra.length > 0) {
          const divKeyValueExtra = document.createElement('span')
          divKeyValueExtra.classList.add('extra')
          divKeyValueExtra.textContent = language[keys][key].extra
          divKey.append(divKeyValueExtra)
        }
        const divKeyValue = document.createElement('span')
        divKeyValue.classList.add('value')
        divKeyValue.textContent = language[keys][key].value
        divKey.append(divKeyValue)
        divRow.append(divKey)
        if (+key === Object.keys(language[keys]).length - 1) {
          const divKeyB = document.createElement('div')
          divKeyB.classList.add('key', 'key-long', 'Backspace')
          divKeyB.textContent = 'Backspace'
          divRow.append(divKeyB)
        }
      })
    }
    if (keys === '1') {
      const divRow = document.createElement('div')
      divRow.classList.add('row-key', 'row-second')
      divRowsWrapper.append(divRow)

      Object.keys(language[keys]).forEach((key) => {
        if (+key === 0) {
          const divKey = document.createElement('div')
          divKey.classList.add('key', 'key-middle', 'Tab')
          divKey.textContent = 'Tab'
          divRow.append(divKey)
          const divKeyTab = document.createElement('span')
          divKeyTab.classList.add('value')
          divKeyTab.textContent = '\t'
          divKey.append(divKeyTab)
        }
        const divKey = document.createElement('div')
        divKey.classList.add('key', 'key-short', `${language[keys][key].class}`)
        if (language[keys][key].extra.length > 0) {
          const divKeyValueExtra = document.createElement('span')
          divKeyValueExtra.classList.add('extra')
          divKeyValueExtra.textContent = language[keys][key].extra
          divKey.append(divKeyValueExtra)
        }
        const divKeyValue = document.createElement('span')
        divKeyValue.classList.add('value')
        divKeyValue.textContent = language[keys][key].value
        divKey.append(divKeyValue)
        divRow.append(divKey)
        if (+key === Object.keys(language[keys]).length - 1) {
          const divKeyD = document.createElement('div')
          divKeyD.classList.add('key', 'key-middle', 'Delete')
          divKeyD.textContent = 'Del'
          divRow.append(divKeyD)
        }
      })
    }
    if (keys === '2') {
      const divRow = document.createElement('div')
      divRow.classList.add('row-key', 'row-third')
      divRowsWrapper.append(divRow)

      Object.keys(language[keys]).forEach((key) => {
        if (+key === 0) {
          const divKey = document.createElement('div')
          divKey.classList.add('key', 'key-long', 'CapsLock')
          divKey.setAttribute('style', 'width: 94px;')
          divKey.textContent = 'Caps Lock'
          divRow.append(divKey)
          const divCaps = document.createElement('div')
          divCaps.classList.add('green')
          if (!caps) {
            divCaps.setAttribute('style', 'display:none;')
          }
          divKey.append(divCaps)
        }
        const divKey = document.createElement('div')
        divKey.classList.add('key', 'key-short', `${language[keys][key].class}`)
        divRow.append(divKey)
        if (language[keys][key].extra.length > 0) {
          const divKeyValueExtra = document.createElement('span')
          divKeyValueExtra.classList.add('extra')
          divKeyValueExtra.textContent = language[keys][key].extra
          divKey.append(divKeyValueExtra)
        }
        const divKeyValue = document.createElement('span')
        divKeyValue.classList.add('value')
        divKeyValue.textContent = language[keys][key].value
        divKey.append(divKeyValue)
        if (+key === Object.keys(language[keys]).length - 1) {
          const divKeyE = document.createElement('div')
          divKeyE.classList.add('key', 'key-long', 'Enter')
          divKeyE.setAttribute('style', 'width: 94px;')
          divKeyE.textContent = 'Enter'
          divRow.append(divKeyE)
          const divKeyValue1 = document.createElement('span')
          divKeyValue1.classList.add('value')
          divKeyValue1.setAttribute('style', 'display:none')
          divKeyValue1.textContent = '\n'
          divKeyE.append(divKeyValue1)
        }
      })
    }
    if (keys === '3') {
      const divRow = document.createElement('div')
      divRow.classList.add('row-key', 'row-four')
      divRowsWrapper.append(divRow)

      Object.keys(language[keys]).forEach((key) => {
        if (+key === 0) {
          const divKey = document.createElement('div')
          divKey.classList.add('key', 'key-long', 'ShiftLeft')
          divKey.textContent = 'Shift'
          divRow.append(divKey)
        }
        const divKey = document.createElement('div')
        divKey.classList.add('key', 'key-short', `${language[keys][key].class}`)
        divRow.append(divKey)
        if (language[keys][key].extra.length > 0) {
          const divKeyValueExtra = document.createElement('span')
          divKeyValueExtra.classList.add('extra')
          divKeyValueExtra.textContent = language[keys][key].extra
          divKey.append(divKeyValueExtra)
        }
        const divKeyValue = document.createElement('span')
        divKeyValue.classList.add('value')
        divKeyValue.textContent = language[keys][key].value
        divKey.append(divKeyValue)
        if (+key === Object.keys(language[keys]).length - 1) {
          // const divKey = document.createElement('div');
          divKey.classList.add('key', 'key-short')
          divKey.textContent = 'Shift'
          divRow.append(divKey)
        }
      })
    }
    if (keys === '4') {
      const divRow = document.createElement('div')
      divRow.classList.add('row-key', 'row-five')
      divRowsWrapper.append(divRow)

      Object.keys(language[keys]).forEach((key) => {
        const divKey = document.createElement('div')
        divKey.classList.add('key', 'key-short', `${language[keys][key].class}`)
        divRow.append(divKey)
        if (language[keys][key].extra.length > 0) {
          const divKeyValueExtra = document.createElement('span')
          divKeyValueExtra.classList.add('extra')
          divKeyValueExtra.textContent = language[keys][key].extra
          divKey.append(divKeyValueExtra)
        }
        const divKeyValue = document.createElement('span')
        divKeyValue.classList.add('value')
        divKeyValue.textContent = language[keys][key].value
        if (language[keys][key].value === 'SPACE') {
          divKey.setAttribute('style', 'width:296px;')
          divKeyValue.textContent = ' '
        }
        if (language[keys][key].value === 'Ctrl' && +key === 0) {
          divKey.setAttribute('style', 'width: 84px;')
        }
        divKey.append(divKeyValue)
      })
    }
  })

  toUpToLow()

  document.querySelector('.keyboard-wrapper').addEventListener('click', (e) => {
    if (!e.target.classList.contains('row-key')) {
      const event = e.target.closest('.key')
      if (!e.target.closest('.press')) {
        switch (
          event.classList.value.split(' ')[
            event.classList.value.split(' ').length - 1
          ]
        ) {
          case 'CapsLock':
            if (!caps) {
              caps = true
              document.querySelector('.green').removeAttribute('style')
            } else {
              caps = false
              document
                .querySelector('.green')
                .setAttribute('style', 'display:none;')
            }
            toUpToLow()
            break
          case 'ShiftLeft':
            if (!shiftSwitch) {
              if (caps) {
                shiftSwitch = true
                shiftCaps = true
                caps = false
              } else {
                shiftSwitch = true
                caps = true
              }
            }
            toUpToLow()
            break
          case 'ShiftRight':
            if (!shiftSwitch) {
              if (caps) {
                shiftCaps = true
                caps = false
                shiftSwitch = true
              } else {
                shiftSwitch = true
                caps = true
              }
            }
            toUpToLow()
            break
          case 'ControlLeft':
            break
          case 'MetaLeft':
            break
          case 'AltLeft':
            break
          case 'AltRight':
            break
          case 'ControlRight':
            break
          case 'Delete':
            keyDelete()
            break
          case 'Backspace':
            keyBackspace()
            break
          default:
            if (caps) {
              if (event.querySelector('.extra') !== null) {
                writeText(event.querySelector('.extra').textContent)
              } else {
                writeText(event.querySelector('.value').textContent)
              }
            } else {
              writeText(event.querySelector('.value').textContent)
            }
        }
      }
    }
  })
}

function setStartContainer() {
  const divContainer = document.createElement('div')
  divContainer.classList.add('container')
  document.querySelector('body').prepend(divContainer)
  const textarea = document.createElement('textarea')
  textarea.classList.add('text')
  divContainer.append(textarea)
  const header = document.createElement('header')
  document.querySelector('body').prepend(header)

  const title = document.createElement('h1')
  title.textContent = 'Виртуальная клавиатура'
  header.append(title)
}

function setStartContainer2() {
  const divContainer = document.createElement('div')
  divContainer.classList.add('container')
  document.querySelector('body').prepend(divContainer)
  const footer = document.createElement('footer')
  document.querySelector('body').prepend(footer)
  const headerRight = document.createElement('div')
  footer.append(headerRight)
  const subTitle = document.createElement('h3')
  subTitle.textContent = 'Переключение языка ввода: Ctrl + Alt'
  headerRight.append(subTitle)
  const textInfo = document.createElement('h3')
  textInfo.textContent = 'Клавиатура создана в операционной системе Windows'
  headerRight.append(textInfo)
}

function resetKeyboard() {
  document.querySelector('.keyboard-wrapper').remove()
  setKeyboardOnLoad()
  if (codeSet.ControlLeft && codeSet.AltLeft) {
    document.querySelector('.ControlLeft').classList.add('press')
    document.querySelector('.AltLeft').classList.add('press')
  }
  else if (codeSet.ControlRight && codeSet.AltRight) {
    document.querySelector('.ControlRight').classList.add('press')
    document.querySelector('.AltRight').classList.add('press')
  }
  else if (codeSet.ControlRight && codeSet.AltLeft) {
    document.querySelector('.ControlRight').classList.add('press')
    document.querySelector('.AltLeft').classList.add('press')
  }
  else {
    document.querySelector('.ControlLeft').classList.add('press')
    document.querySelector('.AltRight').classList.add('press')
  }
}

function switchLang() {
  if (
    (codeSet.ControlLeft && codeSet.AltLeft) ||
    (codeSet.ControlRight && codeSet.AltRight) ||
    (codeSet.ControlRight && codeSet.AltLeft) ||
    (codeSet.ControlLeft && codeSet.AltRight)
  ) {
    if (!switchedLanguage) {
      switchedLanguage = true
      clearInterval(intervalSwitchLang)
      if (lang === 'eng') {
        lang = 'rus'
        language = ruKbd
      } else {
        lang = 'eng'
        language = enKbd
      }
      resetKeyboard()
    }
  }
}

window.addEventListener('load', () => {
  setStartContainer2()
  setStartContainer()
  setKeyboardOnLoad()
})

window.addEventListener('keydown', (e) => {
  e.preventDefault()
  const keyCode = document.querySelector(`.${e.code}`)
  if (keyCode !== null) {
    keyCode.closest('.key').classList.add('press')
    switch (
      keyCode.classList.value.split(' ')[
        keyCode.classList.value.split(' ').length - 2
      ]
    ) {
      case 'CapsLock':
        if (!capsSwitch) {
          if (!caps) {
            caps = true
            capsSwitch = true
            document.querySelector('.green').removeAttribute('style')
          } else {
            caps = false
            capsSwitch = true
            document
              .querySelector('.green')
              .setAttribute('style', 'display:none;')
          }
        }
        toUpToLow()
        break
      case 'ShiftLeft':
        if (!shiftSwitch) {
          if (caps) {
            shiftSwitch = true
            shiftCaps = true
            caps = false
          } else {
            shiftSwitch = true
            caps = true
          }
        }
        toUpToLow()
        break
      case 'ShiftRight':
        if (!shiftSwitch) {
          if (caps) {
            shiftCaps = true
            caps = false
            shiftSwitch = true
          } else {
            shiftSwitch = true
            caps = true
          }
        }
        toUpToLow()
        break
      case 'ControlLeft':
        break
      case 'MetaLeft':
        break
      case 'AltLeft':
        break
      case 'AltRight':
        break
      case 'ControlRight':
        break
      case 'Delete':
        keyDelete()
        break
      case 'Backspace':
        keyBackspace()
        break
      default:
        if (caps) {
          if (keyCode.querySelector('.extra') !== null) {
            writeText(keyCode.querySelector('.extra').textContent)
          } else {
            writeText(keyCode.querySelector('.value').textContent)
          }
        } else {
          writeText(keyCode.querySelector('.value').textContent)
        }
    }
  }
  if (e.code in codeSet) {
    codeSet[e.code] = true
    intervalSwitchLang = setInterval(switchLang, 10)
  }
})

window.addEventListener('keyup', (e) => {
  if (document.querySelector(`.${e.code}`) !== null) {
    document.querySelector(`.${e.code}`).classList.remove('press')
  }
  if (e.code in codeSet) {
    codeSet[e.code] = false
  }
  if (e.code === 'CapsLock') {
    capsSwitch = false
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftSwitch = false
    if (shiftCaps) {
      shiftCaps = false
      caps = true
    } else {
      caps = false
    }
  }
  switchedLanguage = false
  toUpToLow()
})
