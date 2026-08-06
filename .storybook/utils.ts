import { VARIANT } from '@/enums'
export const variantsArgType = {
  control: 'select',
  options: Object.values(VARIANT)
} as const
export const buttonSizesArgType = {
  control: 'inline-radio',
  options: ['sm', 'md', 'lg']
} as const
export const breakpointSizeArgType = {
  control: 'select',
  options: ['xs','sm','md','lg','xl','xxl']
} as const

export const iconWeightsArgType = {
  control: 'select',
  options: ["thin" , "light" , "regular" , "bold" , "fill" , "duotone"]
} as const

export const inputTypeArgType = {
  control: 'select',
  options: [
    'text',
    'number',
    'email',
    'password',
    'search',
    'url',
    'tel',
    'date',
    'time',
    'range',
    'color',
    'datetime',
    'datetime-local',
    'month',
    'week'
  ]
} as const
