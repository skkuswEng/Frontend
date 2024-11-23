import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      writingMode: {
        vertical: 'vertical-rl', // 세로쓰기
        horizontal: 'horizontal-tb', // 가로쓰기 (기본값)
      },
      textOrientation: {
        upright: 'upright', // 한글이 세로로 정렬되도록 설정
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // 서비스 색
        swGrayLight: '#EFEFEF',
        swGray: '#D1CBCB',
        swGrayDark: '#B6B6B6',

        swGreenLight: '#CEF65F',
        swGreen: '#00DE4D',

        swGreenDark: '#278F02',

        swRed: '#F45858',
        swBlue: '#0277FF',
        swBrownLight: '#FCECB8',

        swWhite: '#FFFFFF',
        swBlack: '#000000',
        swBackDrop: '#00000066',

        // Hover 색
        swHoverGreenLight: '#E9FFAD ',
        swHoverGreen: '#00EF53',
        swHoverGray: '#E9E8E8',
        swHoverRed: '#FF8080',
        swHoverBlue: '#2C8DFF',
        // Disable 색
        swDisabledGreen: '#00DE4D66',
        swDisabledGreenLight: '#CEF65F66',
        swDisabledRed: '#F4585866',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        sen: ['var(--font-sen)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        ellipse: '50%',
      },
      aspectRatio: {
        card: '3 / 2',
      },
      boxShadow: {
        'sw-shadow': '0px 1px 0px 0px rgba(0, 0, 0,1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.writing-mode-vertical': {
          'writing-mode': 'vertical-rl',
        },
        '.writing-mode-horizontal': {
          'writing-mode': 'horizontal-tb',
        },
        '.text-orientation-upright': {
          'text-orientation': 'upright',
        },
      })
    },
  ],
} satisfies Config

export default config
