import {
  DataList,
  ErrorState,
  LoadingState,
} from '@/features/example-feature/components/organisms';
import { usePosts, useUsers } from '@/features/example-feature/hooks/use-user';
import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

export default function QueryScreen() {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers();
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = usePosts();

  const isLoading = usersLoading || postsLoading;

  return (
    <>
      <Stack.Screen options={{ title: 'Example Feature' }} />
      <View className="flex-1 bg-background p-4">
        {isLoading && <LoadingState />}

        {(usersError || postsError) && (
          <ErrorState
            onRetry={() => {
              if (usersError) refetchUsers();
              if (postsError) refetchPosts();
            }}
          />
        )}

        {!isLoading && !usersError && !postsError && (
          <DataList
            users={users}
            posts={posts}
            onRefreshUsers={refetchUsers}
            onRefreshPosts={refetchPosts}
          />
        )}
      </View>
    </>
  );
}
