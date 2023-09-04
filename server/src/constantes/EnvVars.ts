import * as dotenv from "dotenv";

dotenv.config()

export default {
  Port: Number(process.env.PORT ?? 0),
  Bcrypt: {
    Salt: Number(process.env.ENCRYPT ?? 8)
  },
  Jwt: {
    Secret: (process.env.JWT_SECRET ??  ''),
    Exp: (process.env.COOKIE_EXP ?? ''), // exp at the same time as the cookie
  },
} as const