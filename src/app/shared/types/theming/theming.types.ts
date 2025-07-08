export enum AppTheme {
  Light = 'light',
  Dark = 'dark'
}

export type ThemeSeverity =
  | string
  | 'success'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warn'
  | 'danger'
  | 'contrast';
