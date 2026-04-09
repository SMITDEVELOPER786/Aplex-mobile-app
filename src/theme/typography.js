import { Platform } from 'react-native';

/**
 * Inter variable font (InterVariable.ttf). Linked via react-native-asset.
 * Use fontWeight '400' | '700' with this family.
 */
/** PostScript names differ by platform; adjust if Inter doesn’t load after rebuild. */
export const InterFamily = Platform.select({
    ios: 'Inter Variable',
    android: 'InterVariable',
    default: 'InterVariable',
});

/** Alpexa / Robinhood-style scale: Headline 34 Bold, Body 16 Regular, Button 17 Bold */
export const InterType = {
    headline: {
        fontFamily: InterFamily,
        fontSize: 34,
        fontWeight: '700',
        letterSpacing: -0.5,
        color: '#FFFFFF',
    },
    body: {
        fontFamily: InterFamily,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: '#FFFFFF',
    },
    bodyMuted: {
        fontFamily: InterFamily,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: '#8E8E93',
    },
    button: {
        fontFamily: InterFamily,
        fontSize: 17,
        fontWeight: '700',
    },
    caption: {
        fontFamily: InterFamily,
        fontSize: 13,
        fontWeight: '400',
        color: '#8E8E93',
    },
    balance: {
        fontFamily: InterFamily,
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.3,
    },
};

/** 8px spacing grid (n × 8) */
export const space = (n) => n * 8;
