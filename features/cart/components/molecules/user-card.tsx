import { Text } from '@/components/ui/text';
import { View } from 'react-native';

interface UserCardProps {
  name: string;
  email: string;
}

export function UserCard({ name, email }: UserCardProps) {
  return (
    <View className="mb-2 rounded-lg border border-border bg-card p-3">
      <Text className="font-semibold text-foreground">{name}</Text>
      <Text className="text-sm text-muted-foreground">{email}</Text>
    </View>
  );
}
