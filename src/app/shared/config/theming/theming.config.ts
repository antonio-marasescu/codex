import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AppThemePreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}'
        },
        secondary: {
          50: '{purple.50}',
          100: '{purple.100}',
          200: '{purple.200}',
          300: '{purple.300}',
          400: '{purple.400}',
          500: '{purple.500}',
          600: '{purple.600}',
          700: '{purple.700}',
          800: '{purple.800}',
          900: '{purple.900}',
          950: '{purple.950}'
        }
      },
      dark: {
        primary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}'
        },
        secondary: {
          50: '{purple.50}',
          100: '{purple.100}',
          200: '{purple.200}',
          300: '{purple.300}',
          400: '{purple.400}',
          500: '{purple.500}',
          600: '{purple.600}',
          700: '{purple.700}',
          800: '{purple.800}',
          900: '{purple.900}',
          950: '{purple.950}'
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      }
    }
  },
  components: {
    menubar: {
      baseItem: {
        borderRadius: '16px'
      }
    },
    button: {
      root: {
        borderRadius: '16px'
      }
    }
  }
});

export const DarkModeSelector = 'codex-dark';
