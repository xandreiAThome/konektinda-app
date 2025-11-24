import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center gap-2">
      <Text className="text-lg font-semibold text-foreground">Loading data...</Text>
      <Text className="text-sm text-muted-foreground">Fetching from API</Text>
    </View>
  );
}
