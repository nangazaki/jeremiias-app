export interface CreateUserDTO {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}