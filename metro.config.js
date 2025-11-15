const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;
config.resolver.unstable_enableSymlinks = false;

// Ensure platform-specific resolution works (.native.ts and .web.ts)
// The order matters - native should be checked before ts
if (!config.resolver.sourceExts.includes('native')) {
  config.resolver.sourceExts.unshift('native', 'web');
}

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });
