import type QRCodeModel from './qrCodeModel'
import type { qrOptions } from './types'

class canvasDrawer {
  _el: HTMLBodyElement
  _htOption: qrOptions
  _elCanvas = document.createElement('canvas')
  _oContext = this._elCanvas.getContext('2d')
  _elImage = document.createElement('img')

  _bIsPainted = false
  _bSupportDataURI: null | boolean = null

  constructor(el: HTMLBodyElement, htOption: qrOptions) {
    this._htOption = htOption
    this._elCanvas.width = htOption.width || 256
    this._elCanvas.height = htOption.height || 256
    this._el = el
    this._clear()
    this._el.appendChild(this._elCanvas)
    this._elImage.alt = 'Scan me!'
    this._elImage.style.display = 'none'
    this._el.appendChild(this._elImage)
  }

  _safeSetDataURI(): void {
    if (this._bSupportDataURI === null) {
      const el = document.createElement('img')
      const fOnError = () => {
        this._bSupportDataURI = false
        // return some error message
      }
      const fOnSuccess = () => {
        this._bSupportDataURI = true
        this._elImage.src = this._elCanvas.toDataURL('image/png')
        this._elImage.style.display = 'block'
        this._elCanvas.style.display = 'none'
      }
      el.onabort = fOnError
      el.onerror = fOnError
      el.onload = fOnSuccess
      el.src =
        'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==' // the Image contains 1px data.
      return
    } else if (this._bSupportDataURI === true) {
      this._elImage.src = this._elCanvas.toDataURL('image/png')
      this._elImage.style.display = 'block'
      this._elCanvas.style.display = 'none'
    } else {
      // return some error message
    }
  }

  draw(oQRCode: QRCodeModel): void {
    const _elImage = this._elImage
    const _oContext = this._oContext
    const _htOption = this._htOption

    const nCount = oQRCode.getModuleCount()
    const nWidth = _htOption.width ? _htOption.width / nCount : 0
    const nHeight = _htOption.height ? _htOption.height / nCount : 0
    const nRoundedWidth = Math.round(nWidth)
    const nRoundedHeight = Math.round(nHeight)

    _elImage.style.display = 'none'

    for (let row = 0; row < nCount; row++) {
      for (let col = 0; col < nCount; col++) {
        const bIsDark = oQRCode.isDark(row, col)
        const nLeft = col * nWidth
        const nTop = row * nHeight
        if (_oContext !== null) {
          if (_htOption.colorDark && _htOption.colorLight) {
            _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight
            _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight
          }
          _oContext.lineWidth = 1
          _oContext.fillRect(nLeft, nTop, nWidth, nHeight)

          _oContext.strokeRect(
            Math.floor(nLeft) + 0.5,
            Math.floor(nTop) + 0.5,
            nRoundedWidth,
            nRoundedHeight
          )

          _oContext.strokeRect(
            Math.ceil(nLeft) - 0.5,
            Math.ceil(nTop) - 0.5,
            nRoundedWidth,
            nRoundedHeight
          )
        }
      }
    }

    this._bIsPainted = true
  }

  makeImage(): void {
    if (this._bIsPainted) {
      this._safeSetDataURI()
    }
  }

  isPainted(): boolean {
    return this._bIsPainted
  }

  _clear(): void {
    this._el.innerHTML = ''
  }

  round(nNumber: number): number {
    if (!nNumber) {
      return nNumber
    }

    return Math.floor(nNumber * 1000) / 1000
  }
}

export default canvasDrawer
