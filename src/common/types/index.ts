export interface LinkItem {
  path: string;
  title: string;
}

export interface Post {
  _id: string;
  restaurant: string;
  description: string;
  image: string;
  city: string;
  user: User;
  comments: Array<Comment>;
  createdAt: string;
}

export interface Comment {
  user: User;
  body: string;
  date: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  homeCity: string;
  profileImage?: string;
}
