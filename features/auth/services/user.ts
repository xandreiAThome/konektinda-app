import { Post, User } from '../types';

// Using JSONPlaceholder - a free fake online REST API for testing and prototyping
const API_BASE = 'https://jsonplaceholder.typicode.com';

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  },

  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  },

  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE}/posts?_limit=10`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    const data = await response.json();
    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    }));
  },
};
