import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(ExpoImage, { className: 'style' });

interface HeaderProps {
  notificationCount?: number;
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ notificationCount = 0, onProfilePress }) => (
  // We add pb-8 (padding-bottom) to give space for the
  // white content area to slide "under" it.
  <View className="bg-transparent px-4 pb-8 pt-4">
    {/* FIX 1: REPOSITIONING THE ICON
      This 'flex-row' puts the logo and icon on the same line.
      'items-center' vertically aligns them.
      'justify-between' pushes the logo to the left and the icon to the right.
    */}
    <View className="flex-row items-center justify-between">
      {/* 1. Logo Image */}
      <ExpoImage
        // IMPORTANT: Make sure this path is correct!
        source={require('../../../../assets/images/konektinda-logo.png')}
        className="h-20 w-56"
        contentFit="contain"
      />

      {/* 2. Profile Icon */}
      <TouchableOpacity onPress={onProfilePress}>
        {/* FIX 2: FIXING THE NOTIFICATION BADGE
          'relative' class tells the 'absolute' child (the badge)
          to position itself *relative* to this container.
        */}
        <View className="relative">
          {/* Profile Container (w-16 h-16 = 64px) */}

          <ExpoImage
            // IMPORTANT: Make sure this path is correct!
            source={require('../../../../assets/images/profile-icon.png')}
            className="h-16 w-16 rounded-full"
            contentFit="cover"
          />

          {/* Notification Badge */}
          {notificationCount > 0 && (
            /*
              'absolute' takes the badge out of the normal layout.
              '-top-1 -left-1' positions it on the top-left corner
              of its 'relative' parent (the TouchableOpacity View).
            */
            <View className="absolute -left-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500">
              <Text className="text-xs font-bold text-white">{notificationCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
