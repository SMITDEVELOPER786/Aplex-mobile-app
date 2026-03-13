
/**
 * @format
 */

import React from 'react';
import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Global font override to DMSans-Medium
// Note: defaultProps might be deprecated in some versions of RN
if (!Text.defaultProps) Text.defaultProps = {};
Text.defaultProps.style = {
    fontFamily: 'DMSans-Medium',
    fontWeight: '500'
};

if (!TextInput.defaultProps) TextInput.defaultProps = {};
TextInput.defaultProps.style = {
    fontFamily: 'DMSans-Medium',
    fontWeight: '500'
};

// Handle possible existing styles by merging
const oldTextRender = Text.render;
if (oldTextRender) {
    Text.render = function (...args) {
        const origin = oldTextRender.call(this, ...args);
        return React.cloneElement(origin, {
            style: [styles.globalFont, origin.props.style],
        });
    };
}

const styles = {
    globalFont: {
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    }
};

AppRegistry.registerComponent(appName, () => App);
