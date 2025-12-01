import React from 'react';
import { Image, ImageProps, StyleSheet, StyleProp, ImageStyle } from 'react-native';

// Extend ImageProps to maintain all original properties
interface AuthAtomImageProps extends ImageProps {
  // You can add specific size or variant props here if needed
  // We explicitly define style to accept array or single style for maximum flexibility
  style?: StyleProp<ImageStyle>;
}

export const A_Image: React.FC<AuthAtomImageProps> = ({ style, ...props }) => {
  return (
    <Image
      // Apply default styles first, then override with props.style
      style={[styles.baseImage, style]}
      // Ensure the image scales nicely within the bounds
      resizeMode="contain"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  baseImage: {
    // Basic defaults that apply to all images unless overridden
    width: '100%',
    height: '100%',
  },
});
