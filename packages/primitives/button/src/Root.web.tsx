import React from 'react'
import { prefixStyle } from '@lada/prefix'
import { component, startWithType, mapWithPropsMemo } from 'refun'
import { TButtonProps } from './types'

export const Button = component(
  startWithType<TButtonProps>(),
  mapWithPropsMemo(({ isDisabled }) => ({
    styles: prefixStyle({
      appearance: 'none',
      background: 'none',
      border: 0,
      cursor: isDisabled ? 'auto' : 'pointer',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      alignSelf: 'stretch',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      minWidth: 0,
      margin: 0,
      outline: 0,
      padding: 0,
      tapHighlightColor: 'rgba(255, 255, 255, 0)',
      userSelect: 'none',
    }),
  }), ['isDisabled'])
)(
  'Button',
  ({
    id,
    accessibilityLabel,
    isDisabled,
    styles,
    onPointerEnter,
    onPointerLeave,
    onPress,
    onPressIn,
    onPressOut,
    onFocus,
    onBlur,
    children,
  }) => (
    <button
      aria-label={accessibilityLabel}
      disabled={isDisabled}
      id={id}
      onClick={onPress}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      onMouseDown={onPressIn}
      onMouseUp={onPressOut}
      onFocus={onFocus}
      onBlur={onBlur}
      style={styles}
    >
      {children}
    </button>
  )
)