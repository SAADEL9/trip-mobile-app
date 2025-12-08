export const COLORS = {
  primary: '#0D5C63',    // Dark Teal
  secondary: '#F2E8CF',  // Sandy Beige
  accent: '#FF6B6B',      // Coral
  text: '#333333',        // Dark Gray
  background: '#FFFFFF',  // White
  lightGray: '#f5f5f5',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, fontWeight: 'bold' },
  h2: { fontSize: SIZES.h2, fontWeight: 'bold' },
  h3: { fontSize: SIZES.h3, fontWeight: 'bold' },
  h4: { fontSize: SIZES.h4, fontWeight: 'bold' },
  body1: { fontSize: SIZES.body1, fontWeight: 'normal' },
  body2: { fontSize: SIZES.body2, fontWeight: 'normal' },
  body3: { fontSize: SIZES.body3, fontWeight: 'normal' },
  body4: { fontSize: SIZES.body4, fontWeight: 'normal' },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
