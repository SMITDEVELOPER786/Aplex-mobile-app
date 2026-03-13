/**
 * Text Style Helper - DM Sans Font
 * Returns consistent text styles with DM Sans font family
 */

export const getTextStyle = (fontSize, fontWeight = '400', additionalStyles = {}) => {
  const fontWeightMap = {
    '100': 'DMSans-Thin',
    '200': 'DMSans-ExtraLight',
    '300': 'DMSans-Light',
    '400': 'DMSans-Regular',
    '500': 'DMSans-Medium',
    '600': 'DMSans-SemiBold',
    '700': 'DMSans-Bold',
    '800': 'DMSans-ExtraBold',
    '900': 'DMSans-Black',
  };

  return {
    fontFamily: fontWeightMap[fontWeight.toString()] || 'DMSans-Regular',
    fontSize,
    ...additionalStyles,
  };
};

// Pre-defined text styles for common use cases
export const TEXT_STYLES = {
  // Heading styles
  h1: {
    fontFamily: 'DMSans-Bold',
    fontSize: 28,
    fontWeight: '700',
  },
  h2: {
    fontFamily: 'DMSans-Bold',
    fontSize: 24,
    fontWeight: '700',
  },
  h3: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 22,
    fontWeight: '600',
  },
  
  // Body styles
  body: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    fontWeight: '500',
  },
  bodySemiBold: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Label styles
  label: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    fontWeight: '500',
  },
  labelSmall: {
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    fontWeight: '400',
  },
  
  // Button styles
  button: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonLarge: {
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  
  // Caption styles
  caption: {
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    fontWeight: '400',
  },
  captionMedium: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    fontWeight: '500',
  },
};

export default TEXT_STYLES;
