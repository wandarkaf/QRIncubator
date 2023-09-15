import type QRCodeModel from './qrCodeModel'
import type { qrOptions } from './types'

class tableDrawer {
  _el: HTMLBodyElement
  _htOption: qrOptions

  constructor(el: HTMLBodyElement, htOption: qrOptions) {
    this._el = el
    this._htOption = htOption
  }

  draw(oQRCode: QRCodeModel): void {
    this.clear()
    const nCount = oQRCode.getModuleCount()
    const nWidth = this._htOption.width ? Math.floor(this._htOption.width / nCount) : 0
    const nHeight = this._htOption.height ? Math.floor(this._htOption.height / nCount) : 0
    const aHTML = ['<table style="border:0;border-collapse:collapse;">']

    for (let row = 0; row < nCount; row++) {
      aHTML.push('<tr>')

      for (let col = 0; col < nCount; col++) {
        aHTML.push(
          '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
            nWidth +
            'px;height:' +
            nHeight +
            'px;background-color:' +
            (oQRCode.isDark(row, col) ? this._htOption.colorDark : this._htOption.colorLight) +
            ';"></td>'
        )
      }

      aHTML.push('</tr>')
    }

    aHTML.push('</table>')
    this._el.innerHTML = aHTML.join('')

    // Fix the margin values as real size.
    const elTable = this._el.childNodes[0] as HTMLTableElement
    const nLeftMarginTable = this._htOption.width
      ? (this._htOption.width - elTable.offsetWidth) / 2
      : 0
    const nTopMarginTable = this._htOption.height
      ? (this._htOption.height - elTable.offsetHeight) / 2
      : 0

    if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
      elTable.style.margin = nTopMarginTable + 'px ' + nLeftMarginTable + 'px'
    }
  }

  clear(): void {
    this._el.innerHTML = ''
  }
}

export default tableDrawer
