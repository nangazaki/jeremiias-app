import { User } from "../modules/users/user.dto";

declare global {
  namespace Express {
    export interface  Request {
      user: User
    }
  }
}