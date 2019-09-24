import { TTheme, TThemes } from '../../types'
import * as Colors from './colors'

const lightTheme: TTheme = {
  name: 'light',
  background: Colors.WHITE,
  backgroundFocus: Colors.WHITE,
  border: Colors.DARK_GRAY,
  foreground: Colors.GRAY,
  foregroundActive: Colors.DARK_GRAY,
  foregroundActiveHover: Colors.DARK_GRAY,
  foregroundActivePressed: Colors.DARK_GRAY,
  foregroundHover: Colors.GRAY,
  foregroundHoverTransparent: Colors.GRAY,
  foregroundPressed: Colors.GRAY,
  foregroundPressedTransparent: Colors.GRAY,
  foregroundTransparent: Colors.GRAY,
  iconActive: Colors.WHITE,
  iconActivePressed: Colors.WHITE,
  iconIdle: Colors.BLACK,
  iconIdlePressed: Colors.BLACK,
  iconTextHover: Colors.BLACK,
  iconTextPressed: Colors.BLACK,
  outlineActiveFocus: Colors.GRAY,
  outlineAlternativeFocus: Colors.GRAY,
  outlineIdleFocus: Colors.GRAY,
  sourceAttribute: [0x13, 0xAF, 0xAC, 1],
  sourceBaseword: [0x78, 0x78, 0x78, 1],
  sourceBoolean: [0x47, 0x78, 0xFF, 1],
  sourceComment: [0xA9, 0x7C, 0x76, 1],
  sourceFunctionCall: [0x91, 0x6C, 0xEA, 1],
  sourceHtmlSyntax: [0x9D, 0xC2, 0x03, 1],
  sourceKeyword: [0xB2, 0x19, 0x6E, 1],
  sourceNumber: [0x00, 0x20, 0xFF, 1],
  sourceOperator: [0x34, 0x34, 0x34, 1],
  sourceString: [0xDE, 0x67, 0xC2, 1],
  sourceTagName: [0x00, 0x9C, 0x58, 1],
  text: Colors.BLACK,
  textCaret: Colors.BLACK,
  textHover: Colors.BLACK,
  textInverted: Colors.WHITE,
  textPlaceholder: Colors.GRAY,
  textPlaceholderHover: Colors.GRAY,
  textPlaceholderPressed: Colors.GRAY,
  textPressed: Colors.BLACK,
}

const darkTheme: TTheme = {
  name: 'dark',
  background: Colors.BLACK,
  backgroundFocus: Colors.BLACK,
  border: Colors.WHITE,
  foreground: Colors.BLACK,
  foregroundActive: Colors.BLACK,
  foregroundActiveHover: Colors.BLACK,
  foregroundActivePressed: Colors.BLACK,
  foregroundHover: Colors.BLACK,
  foregroundHoverTransparent: Colors.BLACK,
  foregroundPressed: Colors.BLACK,
  foregroundPressedTransparent: Colors.BLACK,
  foregroundTransparent: Colors.BLACK,
  iconActive: Colors.WHITE,
  iconActivePressed: Colors.WHITE,
  iconIdle: Colors.WHITE,
  iconIdlePressed: Colors.WHITE,
  iconTextHover: Colors.WHITE,
  iconTextPressed: Colors.WHITE,
  outlineActiveFocus: Colors.WHITE,
  outlineAlternativeFocus: Colors.WHITE,
  outlineIdleFocus: Colors.WHITE,
  sourceAttribute: [0xB9, 0xD6, 0xD2, 1],
  sourceBaseword: [0x9C, 0x9C, 0x9B, 1],
  sourceBoolean: [0xB4, 0xA5, 0xF6, 1],
  sourceComment: [0x83, 0x76, 0x6B, 1],
  sourceFunctionCall: [0xEF, 0xE6, 0x9B, 1],
  sourceHtmlSyntax: [0x85, 0x9F, 0x18, 1],
  sourceKeyword: [0xF3, 0xC8, 0xD6, 1],
  sourceNumber: [0xBE, 0xCB, 0xFF, 1],
  sourceOperator: [0xFF, 0xFF, 0xFF, 1],
  sourceString: [0xDC, 0xA8, 0xDE, 1],
  sourceTagName: [0xD4, 0xEE, 0xA4, 1],
  text: Colors.WHITE,
  textCaret: Colors.WHITE,
  textHover: Colors.WHITE,
  textInverted: Colors.WHITE,
  textPlaceholder: Colors.WHITE,
  textPlaceholderHover: Colors.WHITE,
  textPlaceholderPressed: Colors.WHITE,
  textPressed: Colors.WHITE,
}

export const theme: TThemes = {
  light: lightTheme,
  dark: darkTheme,
}
