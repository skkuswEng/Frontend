import config from '@/tailwind.config'

// tailwindcss colors (값)
export const colorSet = {
  // 서비스 색
  swGrayLight: config.theme.extend.colors.swGrayLight,
  swGray: config.theme.extend.colors.swGray,
  swGrayDark: config.theme.extend.colors.swGrayDark,

  swGreenLight: config.theme.extend.colors.swGreenLight,
  swGreen: config.theme.extend.colors.swGreen,

  swGreenDark: config.theme.extend.colors.swGreenDark,

  swRed: config.theme.extend.colors.swRed,
  swBrownLight: config.theme.extend.colors.swBrownLight,

  swWhite: config.theme.extend.colors.swWhite,
  swBlack: config.theme.extend.colors.swBlack,
  swBackDrop: config.theme.extend.colors.swBackDrop,

  // Hover 색
  swHoverGray: config.theme.extend.colors.swHoverGray,

  swHoverGreenLight: config.theme.extend.colors.swHoverGreenLight,
  swHoverGreen: config.theme.extend.colors.swHoverGreen,

  swHoverRed: config.theme.extend.colors.swHoverRed,
  swHoverBlue: config.theme.extend.colors.swHoverBlue,
  // Disable 색
  swDisabledGreen: config.theme.extend.colors.swDisabledGreen,
  swDisabledGreenLight: config.theme.extend.colors.swDisabledGreenLight,
  swDisabledRed: config.theme.extend.colors.swDisabledRed,
}

export type ColorType = keyof typeof colorSet
