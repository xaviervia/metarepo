import { ReactNode } from 'react'

export type TBlockCommon = {
  id?: string,
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
  opacity?: number,
  isFloating?: boolean,
  floatingIndex?: number,
  shouldIgnorePointerEvents?: boolean,
  shouldStretch?: boolean,
  shouldScroll?: boolean,
  shouldHideOverflow?: boolean,
  children?: ReactNode,
  onPointerEnter?: () => void,
  onPointerLeave?: () => void,
  onPointerDown?: () => void,
  onPointerUp?: () => void,
  onPointerMove?: () => void
}
