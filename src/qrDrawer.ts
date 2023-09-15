import type { qrOptions } from './types'
import { isSupportCanvas } from './utils'
import svgDrawer from './svgDrawer'
import canvasDrawer from './canvasDrawer'
import tableDrawer from './tableDrawer'

const qrDrawer = (el: HTMLBodyElement, options: qrOptions) => {
  return options.element === 'svg'
    ? new svgDrawer(el, options)
    : isSupportCanvas() && options.element === 'canvas'
    ? new canvasDrawer(el, options)
    : new tableDrawer(el, options)
}

export default qrDrawer
