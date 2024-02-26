export type EmptyOrDoubleZero = '' | '00:'

export const themeColors = {
  light: {
    primary: '#0284c7',
    background: '#d6d6d6',
  },
  dark: {
    primary: '#f43f5e',
    background: '#334155',
  },
};

export type ActiveTheme = keyof typeof themeColors;
