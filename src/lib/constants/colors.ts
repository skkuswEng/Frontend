import config from '@/tailwind.config'

// tailwindcss colors (값)
export const colorSet = {
  swBlack: config.theme.extend.colors.swBlack,
  swWhite: config.theme.extend.colors.swWhite,
  swLightGray: config.theme.extend.colors.swLightGray,
  swLightGreen: config.theme.extend.colors.swLightGreen,
  swDarkGreen: config.theme.extend.colors.swDarkGreen,
  swGreen: config.theme.extend.colors.swGreen,
}

export type ColorType = keyof typeof colorSet
