import { Post, User } from '../../types';
import { FlatList, View } from 'react-native';
import { PostCard, SectionHeader, UserCard } from '../molecules';

interface DataListProps {
  users: User[] | undefined;
  posts: Post[] | undefined;
  onRefreshUsers: () => void;
  onRefreshPosts: () => void;
}

export function DataList({ users, posts, onRefreshUsers, onRefreshPosts }: DataListProps) {
  return (
    <FlatList
      data={[
        { key: 'users-header', type: 'users-header' as const },
        ...(users?.map((user) => ({ ...user, type: 'user' as const })) || []),
        { key: 'posts-header', type: 'posts-header' as const },
        ...(posts?.map((post) => ({
          ...post,
          type: 'post' as const,
          body: post.body.substring(0, 50) + '...',
        })) || []),
      ]}
      keyExtractor={(item: any) => item.key || `${item.type}-${item.id}`}
      renderItem={({ item }: any) => {
        if (item.type === 'users-header') {
          return <SectionHeader title="Users" onRefresh={onRefreshUsers} />;
        }

        if (item.type === 'posts-header') {
          return <SectionHeader title="Posts" onRefresh={onRefreshPosts} />;
        }

        if (item.type === 'user') {
          return <UserCard name={item.name} email={item.email} />;
        }

        if (item.type === 'post') {
          return <PostCard title={item.title} body={item.body} />;
        }

        return null;
      }}
      scrollEnabled={true}
    />
  );
}
