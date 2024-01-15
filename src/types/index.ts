export interface LinkItem {
  path: string;
  title: string;
}

export interface Post {
  _id: string;
  restaurant: string;
  description: string;
  image: string; // base64
  city: string;
  user: User;
  comments: Array<string>; // not populated object ids
  createdAt: Date;
}

export interface Comment {
  _id: string;
  user: User;
  createdAt: Date;
  body: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string; //base64
  homeCity: string;
  token: string;
}
