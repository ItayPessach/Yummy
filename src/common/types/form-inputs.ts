export interface LoginDto {
  email: string;
  password: string;
}
export interface UploadPostDto {
  restaurant: string;
  description: string;
  picture?: File;
  city: string;
}

export interface PostToEdit extends UploadPostDto {
  postId: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  homeCity?: string;
  picture?: File;
}

export interface PostFormInput {
  restaurant: string;
  description: string;
  city: string;
}

export interface EditProfileFormInput {
  homeCity?: string;
  fullName: string;
}

export interface RegisterFormInput {
  email: string;
  password: string;
  fullName: string;
  homeCity?: string;
}
