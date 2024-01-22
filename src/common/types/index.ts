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
  createdAt: Date;
}

export interface Comment {
  user: User;
  body: string;
  date: Date;
}

export interface User {
  _id: string;
  fullname: string;
  email: string;
  profileImage?: string;
  homeCity: string;
}
