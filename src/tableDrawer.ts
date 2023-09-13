import type QRCodeModel from './qrCodeModel'
import type { IOptions } from './types'

export default class tableDrawer {
  _el: HTMLBodyElement
  _htOption: IOptions

  constructor(el: HTMLBodyElement, htOption: IOptions) {
    this._el = el
    this._htOption = htOption
  }

  draw(oQRCode: QRCodeModel): void {
    const nCount = oQRCode.getModuleCount()
    const nWidth = Math.floor(this._htOption.width / nCount)
    const nHeight = Math.floor(this._htOption.height / nCount)
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
    const nLeftMarginTable = (this._htOption.width - elTable.offsetWidth) / 2
    const nTopMarginTable = (this._htOption.height - elTable.offsetHeight) / 2

    if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
      elTable.style.margin = nTopMarginTable + 'px ' + nLeftMarginTable + 'px'
    }
  }

  clear(): void {
    this._el.innerHTML = ''
  }
}
