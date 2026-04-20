/**
 * Default Text / TextInput font — kept out of index.js so AppRegistry can run first.
 */
import React from 'react';
import { Text, TextInput } from 'react-native';

if (!Text.defaultProps) Text.defaultProps = {};
Text.defaultProps.style = {
  fontFamily: 'DMSans-Medium',
  fontWeight: '500',
};

if (!TextInput.defaultProps) TextInput.defaultProps = {};
TextInput.defaultProps.style = {
  fontFamily: 'DMSans-Medium',
  fontWeight: '500',
};

const styles = {
  globalFont: {
    fontFamily: 'DMSans-Medium',
    fontWeight: '500',
  },
};

const oldTextRender = Text.render;
if (oldTextRender) {
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.globalFont, origin.props.style],
    });
  };
}
