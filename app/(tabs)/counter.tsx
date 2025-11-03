import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { MinusIcon, PlusIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Stack.Screen options={{ title: 'Counter' }} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <View className="items-center gap-4">
          <Text className="text-6xl font-bold text-foreground">{count}</Text>
          <Text className="text-sm text-muted-foreground">Current Count</Text>
        </View>

        <View className="flex-row gap-4">
          <Button onPress={() => setCount(count - 1)} variant="outline" className="gap-2">
            <Icon as={MinusIcon} className="size-5" />
            <Text>Decrease</Text>
          </Button>

          <Button onPress={() => setCount(0)} variant="ghost">
            <Text>Reset</Text>
          </Button>

          <Button onPress={() => setCount(count + 1)} className="gap-2">
            <Icon as={PlusIcon} className="size-5" />
            <Text>Increase</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
