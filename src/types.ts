export type element = 'svg' | 'canvas' | 'table'
export type correctLevel = 0 | 1 | 2 | 3

export type qrOptions = {
  text: string
  width?: number
  height?: number
  colorDark?: string
  colorLight?: string
  correctLevel?: correctLevel
  element?: element
}

export type svgAttrs = {
  id?: string
  x?: string
  y?: string
  viewBox?: string
  width?: string
  height?: string
  fill?: string
}

export type QRRSBlock = {
  totalCount: number
  dataCount: number
}
