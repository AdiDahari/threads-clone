export interface Thread {
  id: string;
  author: User;
  content: string;
  image?: string;
  replies?: Reply[];
  repliesCount: number;
  likers?: User[];
  likesCount: number;
  mentions?: User[];
  createdAt: string;
}

export interface Reply {
  id: string;
  author: User;
  content: string;
  replies?: Reply[];
  repliesCount: number;
  likers?: User[];
  likesCount: number;
  mentions?: User[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  verified: boolean;
  photo: string;
  bio: string;
  link?: string;
  followers: User[];
  createdAt: string;
}
