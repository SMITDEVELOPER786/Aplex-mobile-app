/**
 * Design tokens — use these for a consistent, professional UI.
 * Accent: brand blue. Spacing: 8px grid.
 */
export const Colors = {
    accent: '#1F51FF',
    onAccent: '#FFFFFF',
    /** @deprecated Use `accent` */
    rhGreen: '#1F51FF',
    rhRed: '#FF5000',
    black: '#000000',
    white: '#FFFFFF',
    labelPrimary: '#FFFFFF',
    labelSecondary: '#8E8E93',
    labelTertiary: '#636366',
    separator: '#2C2C2E',
    fillSecondary: '#1C1C1E',
    fillTertiary: '#2C2C2E',
    /** Surfaces slightly above black */
    surfaceRaised: '#0D1117',
    /** Accent at low opacity (selection, glows) */
    accentMuted12: 'rgba(31, 81, 255, 0.12)',
    accentMuted18: 'rgba(31, 81, 255, 0.18)',
    accentMuted20: 'rgba(31, 81, 255, 0.2)',
    chartPositiveFill: 'rgba(31, 81, 255, 0.14)',
    chartLine: '#1F51FF',
};

/** 8px-based spacing */
export const Space = {
    1: 8,
    2: 16,
    3: 24,
    4: 32,
    5: 40,
    6: 48,
};

export const Radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 24,
    button: 26,
};

export const Type = {
    largeTitle: 34,
    balance: 48,
    title2: 22,
    title3: 20,
    headline: 17,
    body: 17,
    callout: 16,
    subheadline: 15,
    footnote: 13,
    caption1: 12,
    caption2: 11,
    button: 17,
    amountCurrency: 44,
    amountDigit: 56,
    keypad: 28,
};

export const Button = {
    height: 52,
    radius: 26,
    borderWidth: 1,
    textSize: Type.button,
};
