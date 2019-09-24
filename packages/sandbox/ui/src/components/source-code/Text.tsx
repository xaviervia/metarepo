import React, { FC } from 'react'
import { TColor, colorToString } from 'colorido'
import { Text as PrimitiveText } from '@primitives/text'
import { LINE_HEIGHT } from './utils'

export type TText = {
  color: TColor,
}

export const Text: FC<TText> = ({ color, children }) => (
  <PrimitiveText
    fontFamily="monospace"
    fontSize={14}
    lineHeight={LINE_HEIGHT}
    color={colorToString(color)}
    shouldPreserveWhitespace
  >
    {children}
  </PrimitiveText>
)
