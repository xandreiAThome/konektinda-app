import React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';

interface AuthAtomImageProps extends ImageProps {
  // You can add specific props here, e.g., for different image sizes/variants
}

export const A_Image: React.FC<AuthAtomImageProps> = ({ style, ...props }) => {
  return (
    <Image 
      style={[styles.image, style]} 
      resizeMode="contain" // Default to contain, can be overridden
      {...props} 
    />
  );
};

const styles = StyleSheet.create({
  image: {
    // Basic styling, can be customized per use
    width: '100%', 
    height: '100%',
  },
});