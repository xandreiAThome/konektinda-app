import { View, ActivityIndicator, Text } from 'react-native';

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
      <Text className="mt-10">Loading...</Text>
    </View>
  );
}
