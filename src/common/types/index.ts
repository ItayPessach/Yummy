export interface LinkItem {
  path: string;
  title: string;
}

export interface IPost {
  _id: string;
  restaurant: string;
  description: string;
  image: string;
  city: string;
  user: IUser;
  comments: Array<IComment>;
  createdAt: string;
}

export interface IComment {
  user: IUser;
  body: string;
  date: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  homeCity: string;
  profileImage?: string;
}
