/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',    // Primary desktop transition breakpoint
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1600px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        cyber: {
          bg: '#000000',
          'surface-0': '#070707',
          'surface-1': '#0a0a0b',
          'surface-2': '#0e0e10',
          'surface-3': '#111114',
          'surface-4': '#131316',
          'surface-5': '#17171b',
          'surface-6': '#1e1e22',
          'surface-7': '#26262b',
          divider: '#242327',
          line: '#26262b',

          /* Primary Cyber Accent */
          primary: {
            DEFAULT: '#f85c3a',
            hover: '#d94a2c',
            glow: 'rgba(248, 92, 58, 0.50)',
            faint: 'rgba(248, 92, 58, 0.15)',
            subtle: 'rgba(248, 92, 58, 0.06)',
          },

          /* Secondary & Ambient Palette */
          indigo: '#5a66ee',
          violet: '#9b4dff',
          purple: '#7b3ff2',
          pink: '#ff4fa3',
          magenta: '#dc36c3',
          cyan: '#6aa8ff',
          green: '#3ddc84',
          emerald: '#5fe09a',
          threat: '#ff6b6b',
          danger: '#eb4242',
          caution: '#f0b34c',

          /* Text Hierarchy */
          text: {
            primary: '#f2f2f2',
            white: '#ffffff',
            silver: '#cfd2d8',
            secondary: '#9b9da5',
            muted: '#8a8c94',
            dim: '#6b6d75',
            dark: '#5a5d66',
          },

          /* Inverted Canvas (Demo/Contact) */
          inverse: {
            bg: '#f0ece9',
            text: '#000000',
            card: '#ffffff',
            line: 'rgba(0, 0, 0, 0.15)',
          }
        }
      },
      fontFamily: {
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Neue Machina"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['1.0rem', { lineHeight: '1.4' }],
        'xs': ['1.2rem', { lineHeight: '1.5' }],
        'sm': ['1.4rem', { lineHeight: '1.5' }],
        'base': ['1.6rem', { lineHeight: '1.5' }],
        'lg': ['1.8rem', { lineHeight: '1.6' }],
        'xl': ['2.0rem', { lineHeight: '1.4' }],
        '2xl': ['2.2rem', { lineHeight: '1.2' }],
        '3xl': ['2.6rem', { lineHeight: '1.15' }],
        '4xl': ['3.2rem', { lineHeight: '1.1' }],
        '5xl': ['4.8rem', { lineHeight: '1.0' }],
        '6xl': ['6.0rem', { lineHeight: '1.0' }],
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(248, 92, 58, 0.35)',
        'glow-primary-lg': '0 0 45px rgba(248, 92, 58, 0.50)',
        'glow-indigo': '0 0 35px rgba(90, 102, 238, 0.35)',
        'glow-violet': '0 0 35px rgba(155, 77, 255, 0.25)',
        'inset-stroke': 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'card-glass': '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'glass': '10px',
        'card': '15px',
        'heavy': '50px',
      },
      borderRadius: {
        'chamfer': '0.9rem',
        'pill': '9999px',
        'card': '1.33rem',
        'panel': '2.0rem',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(244deg, #fff7a7 0%, #f48445 19.51%, #fff7a7 30.2%, #ff98ff 43.39%, #5a66ee 57.46%, #91bdff 64.75%, #91bdff 83.71%, #ff98ff 93.14%, #dc36c3 100%)',
        'gradient-metal': 'radial-gradient(65.14% 95.92% at 48.14% 5%, #ebe6e1 46.83%, #c3c0ba)',
        'aura-faq': 'radial-gradient(75% 55% at 50% 0%, rgba(96, 40, 110, 0.32), transparent 70%)',
        'aura-warm': 'radial-gradient(circle at center, rgba(248, 92, 58, 0.5), transparent 70%)',
        'aura-cool': 'radial-gradient(circle at center, rgba(90, 102, 238, 0.4), transparent 70%)',
      },
      transitionTimingFunction: {
        'cyber-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'panel-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce-elastic': 'cubic-bezier(0.34, 4.56, 0.64, 1)',
      },
      animation: {
        'marquee': 'reel 40s linear infinite',
        'shake': 'shake 0.3s ease-in-out',
        'face-pulse': 'facePulse 2s infinite ease-in-out',
        'fade-in': 'capIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        reel: {
          '0%': { transform: 'translate(0)' },
          '100%': { transform: 'translate(-50%)' },
        },
        shake: {
          '0%, 100%': { transform: 'none' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        facePulse: {
          '0%, 100%': { transform: 'scale(1)', color: 'inherit' },
          '50%': { transform: 'scale(1.08)', color: '#f85c3a' },
        },
        capIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'none' },
        }
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.clip-chamfer': {
          'clip-path': 'polygon(0.9rem 0, 100% 0, 100% calc(100% - 0.9rem), calc(100% - 0.9rem) 100%, 0 100%, 0 0.9rem)',
        },
        '.clip-chamfer-sm': {
          'clip-path': 'polygon(0.5rem 0, 100% 0, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0 100%, 0 0.5rem)',
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.glass-panel': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(15px)',
          '-webkit-backdrop-filter': 'blur(15px)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.glass-pill': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.05)',
          'border-radius': '9999px',
        }
      });
    }
  ]
};
