import React, { FC } from 'react'
import { Icon } from '../icon'
import { TIcon } from './types'

export const IconGrid: FC<TIcon> = ({ color }) => (
  <Icon
    color={color}
    d="M10.75,14.5 L14.5,14.5 L14.5,10.75 L10.75,10.75 L10.75,14.5 Z M5.5,14.5 L9.25,14.5 L9.25,10.75 L5.5,10.75 L5.5,14.5 Z M5.5,9.25 L9.25,9.25 L9.25,5.5 L5.5,5.5 L5.5,9.25 Z M16,14.5 L16.25,14.5 C16.664,14.5 17,14.836 17,15.25 C17,15.664 16.664,16 16.25,16 L16,16 L16,16.25 C16,16.664 15.664,17 15.25,17 C14.836,17 14.5,16.664 14.5,16.25 L14.5,16 L5.5,16 L5.5,16.25 C5.5,16.664 5.164,17 4.75,17 C4.336,17 4,16.664 4,16.25 L4,16 L3.75,16 C3.336,16 3,15.664 3,15.25 C3,14.836 3.336,14.5 3.75,14.5 L4,14.5 L4,5.5 L3.75,5.5 C3.336,5.5 3,5.164 3,4.75 C3,4.336 3.336,4 3.75,4 L4,4 L4,3.75 C4,3.336 4.336,3 4.75,3 C5.164,3 5.5,3.336 5.5,3.75 L5.5,4 L14.5,4 L14.5,3.75 C14.5,3.336 14.836,3 15.25,3 C15.664,3 16,3.336 16,3.75 L16,4 L16.25,4 C16.664,4 17,4.336 17,4.75 C17,5.164 16.664,5.5 16.25,5.5 L16,5.5 L16,14.5 Z M10.75,9.25 L14.5,9.25 L14.5,5.5 L10.75,5.5 L10.75,9.25 Z"
  />
)

IconGrid.displayName = 'IconGrid'
