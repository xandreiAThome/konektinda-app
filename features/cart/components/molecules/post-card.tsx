import { Text } from '@/components/ui/text';
import { View } from 'react-native';

interface PostCardProps {
  title: string;
  body: string;
}

export function PostCard({ title, body }: PostCardProps) {
  return (
    <View className="mb-2 rounded-lg border border-border bg-card p-3">
      <Text className="font-semibold text-foreground">{title}</Text>
      <Text className="text-sm text-muted-foreground">{body}</Text>
    </View>
  );
}
