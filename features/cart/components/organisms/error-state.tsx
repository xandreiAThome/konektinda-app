import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { AlertCircleIcon } from 'lucide-react-native';
import { View } from 'react-native';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4">
      <Icon as={AlertCircleIcon} className="size-8 text-destructive" />
      <Text className="text-sm font-medium text-destructive">Error loading data</Text>
      <Button onPress={onRetry} variant="outline" size="sm">
        <Text>Retry</Text>
      </Button>
    </View>
  );
}
