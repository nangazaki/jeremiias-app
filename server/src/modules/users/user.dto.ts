export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserInfoEditDTO {
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  emailVerifiedAt: Date | null;
  isSuperAdmin: boolean;
}
