/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    // Design rule: no text smaller than 14px.
    fontSize: {
      xs: ['14px', { lineHeight: '1.4' }],
      sm: ['15px', { lineHeight: '1.45' }],
      base: ['16px', { lineHeight: '1.5' }],
      lg: ['18px', { lineHeight: '1.4' }],
      xl: ['22px', { lineHeight: '1.25' }],
      '2xl': ['26px', { lineHeight: '1.2' }],
      '3xl': ['30px', { lineHeight: '1.15' }],
      '4xl': ['34px', { lineHeight: '1.1' }],
    },
    extend: {
      fontFamily: { sans: ['Figtree', 'system-ui', 'sans-serif'] },
      colors: {
        primary: { DEFAULT: v('primary'), strong: v('primary-strong'), soft: v('primary-soft'), light: v('primary-light') },
        onprimary: v('on-primary'),
        info: v('info'),
        ink: { DEFAULT: v('ink'), muted: v('ink-muted'), alt: v('ink-alt') },
        bg: v('bg'),
        surface: v('surface'),
        line: { DEFAULT: v('line'), soft: v('line-soft') },
        caution: { bg: v('caution-bg'), border: v('caution-border'), text: v('caution-text'), body: v('caution-body') },
        danger: { bg: v('danger-bg'), border: v('danger-border'), text: v('danger-text'), body: v('danger-body') },
        success: { DEFAULT: v('success'), bg: v('success-bg') },
        gold: { DEFAULT: v('gold'), bg: v('gold-bg') },
        streak: { DEFAULT: v('streak'), bg: v('streak-bg') },
        st: {
          nsbg: v('st-ns-bg'), nstext: v('st-ns-text'),
          lbg: v('st-l-bg'), ltext: v('st-l-text'),
          pbg: v('st-p-bg'), ptext: v('st-p-text'),
          mbg: v('st-m-bg'), mtext: v('st-m-text'),
        },
      },
      borderRadius: { chip: '10px', btn: '14px', card: '20px' },
      keyframes: {
        shake: { '0%,100%': { transform: 'translateX(0)' }, '25%,75%': { transform: 'translateX(-2px)' }, '50%': { transform: 'translateX(2px)' } },
        pulseok: { '0%': { boxShadow: '0 0 0 0 rgb(var(--success) / 0.45)' }, '100%': { boxShadow: '0 0 0 12px rgb(var(--success) / 0)' } },
        burst: { '0%': { transform: 'translate(0,0) scale(1)', opacity: '1' }, '100%': { transform: 'translate(var(--dx), var(--dy)) scale(0.4)', opacity: '0' } },
        fadein: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        shake: 'shake 240ms ease-in-out',
        pulseok: 'pulseok 600ms ease-out',
        burst: 'burst 900ms ease-out forwards',
        fadein: 'fadein 220ms ease-out',
      },
    },
  },
  plugins: [],
};
