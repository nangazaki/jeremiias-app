import { User } from "../users/user.dto";

export interface Login {
  email: string;
  password: string;
}

export interface LoggedUser {
  user: User;
  token: string;
}
