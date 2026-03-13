/**
 * DM Sans Font Configuration
 * All font weights and styles available for the app
 */

export const DM_SANS_FONT_FAMILY = 'DMSans';

export const DM_SANS = {
  // Regular weights
  Thin: 'DMSans-Thin',
  ThinItalic: 'DMSans-ThinItalic',
  ExtraLight: 'DMSans-ExtraLight',
  ExtraLightItalic: 'DMSans-ExtraLightItalic',
  Light: 'DMSans-Light',
  LightItalic: 'DMSans-LightItalic',
  Regular: 'DMSans-Regular',
  Italic: 'DMSans-Italic',
  Medium: 'DMSans-Medium',
  MediumItalic: 'DMSans-MediumItalic',
  SemiBold: 'DMSans-SemiBold',
  SemiBoldItalic: 'DMSans-SemiBoldItalic',
  Bold: 'DMSans-Bold',
  BoldItalic: 'DMSans-BoldItalic',
  ExtraBold: 'DMSans-ExtraBold',
  ExtraBoldItalic: 'DMSans-ExtraBoldItalic',
  Black: 'DMSans-Black',
  BlackItalic: 'DMSans-BlackItalic',
  
  // 18pt variants
  _18pt_Thin: 'DMSans_18pt-Thin',
  _18pt_ThinItalic: 'DMSans_18pt-ThinItalic',
  _18pt_ExtraLight: 'DMSans_18pt-ExtraLight',
  _18pt_ExtraLightItalic: 'DMSans_18pt-ExtraLightItalic',
  _18pt_Light: 'DMSans_18pt-Light',
  _18pt_LightItalic: 'DMSans_18pt-LightItalic',
  _18pt_Regular: 'DMSans_18pt-Regular',
  _18pt_Italic: 'DMSans_18pt-Italic',
  _18pt_Medium: 'DMSans_18pt-Medium',
  _18pt_MediumItalic: 'DMSans_18pt-MediumItalic',
  _18pt_SemiBold: 'DMSans_18pt-SemiBold',
  _18pt_SemiBoldItalic: 'DMSans_18pt-SemiBoldItalic',
  _18pt_Bold: 'DMSans_18pt-Bold',
  _18pt_BoldItalic: 'DMSans_18pt-BoldItalic',
  _18pt_ExtraBold: 'DMSans_18pt-ExtraBold',
  _18pt_ExtraBoldItalic: 'DMSans_18pt-ExtraBoldItalic',
  _18pt_Black: 'DMSans_18pt-Black',
  _18pt_BlackItalic: 'DMSans_18pt-BlackItalic',
  
  // 24pt variants
  _24pt_Thin: 'DMSans_24pt-Thin',
  _24pt_ThinItalic: 'DMSans_24pt-ThinItalic',
  _24pt_ExtraLight: 'DMSans_24pt-ExtraLight',
  _24pt_ExtraLightItalic: 'DMSans_24pt-ExtraLightItalic',
  _24pt_Light: 'DMSans_24pt-Light',
  _24pt_LightItalic: 'DMSans_24pt-LightItalic',
  _24pt_Regular: 'DMSans_24pt-Regular',
  _24pt_Italic: 'DMSans_24pt-Italic',
  _24pt_Medium: 'DMSans_24pt-Medium',
  _24pt_MediumItalic: 'DMSans_24pt-MediumItalic',
  _24pt_SemiBold: 'DMSans_24pt-SemiBold',
  _24pt_SemiBoldItalic: 'DMSans_24pt-SemiBoldItalic',
  _24pt_Bold: 'DMSans_24pt-Bold',
  _24pt_BoldItalic: 'DMSans_24pt-BoldItalic',
  _24pt_ExtraBold: 'DMSans_24pt-ExtraBold',
  _24pt_ExtraBoldItalic: 'DMSans_24pt-ExtraBoldItalic',
  _24pt_Black: 'DMSans_24pt-Black',
  _24pt_BlackItalic: 'DMSans_24pt-BlackItalic',
  
  // 36pt variants
  _36pt_Thin: 'DMSans_36pt-Thin',
  _36pt_ThinItalic: 'DMSans_36pt-ThinItalic',
  _36pt_ExtraLight: 'DMSans_36pt-ExtraLight',
  _36pt_ExtraLightItalic: 'DMSans_36pt-ExtraLightItalic',
  _36pt_Light: 'DMSans_36pt-Light',
  _36pt_LightItalic: 'DMSans_36pt-LightItalic',
  _36pt_Regular: 'DMSans_36pt-Regular',
  _36pt_Italic: 'DMSans_36pt-Italic',
  _36pt_Medium: 'DMSans_36pt-Medium',
  _36pt_MediumItalic: 'DMSans_36pt-MediumItalic',
  _36pt_SemiBold: 'DMSans_36pt-SemiBold',
  _36pt_SemiBoldItalic: 'DMSans_36pt-SemiBoldItalic',
  _36pt_Bold: 'DMSans_36pt-Bold',
  _36pt_BoldItalic: 'DMSans_36pt-BoldItalic',
  _36pt_ExtraBold: 'DMSans_36pt-ExtraBold',
  _36pt_ExtraBoldItalic: 'DMSans_36pt-ExtraBoldItalic',
  _36pt_Black: 'DMSans_36pt-Black',
  _36pt_BlackItalic: 'DMSans_36pt-BlackItalic',
};

/**
 * Helper function to get font family based on weight and style
 * @param {string} weight - 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
 * @param {boolean} italic - whether italic style
 * @returns {string} font family name
 */
export const getDM SansFont = (weight = 'regular', italic = false) => {
  const weightMap = {
    thin: 'Thin',
    extralight: 'ExtraLight',
    light: 'Light',
    regular: 'Regular',
    medium: 'Medium',
    semibold: 'SemiBold',
    bold: 'Bold',
    extrabold: 'ExtraBold',
    black: 'Black',
  };
  
  const fontName = weightMap[weight.toLowerCase()] || 'Regular';
  return italic ? DM_SANS[`${fontName}Italic`] : DM_SANS[fontName];
};

export default DM_SANS;
