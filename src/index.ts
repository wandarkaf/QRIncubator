/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 *
 * @author wandarkaf
 * @see <a href="https://kazuhikoarase.github.io/qrcode-generator/js/demo/" target="_blank">https://kazuhikoarase.github.io/qrcode-generator/js/demo/</a>
 */

//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: https://kazuhikoarase.github.io/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

import type { qrOptions } from './types'
import { getTypeNumber } from './utils'

import QRCodeModel from './qrCodeModel'
import qrDrawer from './qrDrawer'

/**
 * @function QRCode
 * @example
 * QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
 *
 * @example
 * const oQRCode = QRCode("test", {
 *    text : "http://naver.com",
 *    width : 128,
 *    height : 128
 * });
 *
 *
 * @param {HTMLElement} el target element or 'id' attribute of element.
 * @param {qrOptions} options
 */
const optionDefaults: qrOptions = {
  text: '',
  width: 256,
  height: 256,
  colorDark: '#000000',
  colorLight: '#ffffff',
  correctLevel: 2,
  element: 'canvas'
}

const QRCode = (el: HTMLBodyElement, options: qrOptions): void => {
  const _options = { ...optionDefaults, ...options }
  const { text, correctLevel } = _options

  const _oQRCode = new QRCodeModel(getTypeNumber(text, correctLevel), correctLevel)
  const _oDrawing = qrDrawer(el, _options)

  _oQRCode.addData(text)
  _oQRCode.make()

  _oDrawing.draw(_oQRCode)
}

export default QRCode
