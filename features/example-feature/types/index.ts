export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
