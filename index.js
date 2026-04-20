/**
 * @format
 * Register the root component first. Anything above `registerComponent` that throws
 * causes "aplex has not been registered" because native still starts with that name.
 */
import { AppRegistry } from 'react-native';

const ROOT_COMPONENT_NAME = 'aplex';

AppRegistry.registerComponent(ROOT_COMPONENT_NAME, () => {
  require('./src/setupGlobalFonts');
  return require('./App').default;
});
