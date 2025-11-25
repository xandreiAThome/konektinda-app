import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { RefreshCwIcon } from 'lucide-react-native';
import { View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  onRefresh?: () => void;
}

export function SectionHeader({ title, onRefresh }: SectionHeaderProps) {
  return (
    <View className="mb-3 mt-2 flex-row items-center justify-between">
      <Text className="text-lg font-semibold text-foreground">{title}</Text>
      {onRefresh && (
        <Button onPress={onRefresh} variant="ghost" size="icon">
          <Icon as={RefreshCwIcon} className="size-5" />
        </Button>
      )}
    </View>
  );
}
