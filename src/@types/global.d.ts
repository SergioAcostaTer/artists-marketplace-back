import { IUser } from "../contracts/user"


declare global {
  namespace Express {
    interface Locals {
      user: Omit<IUser, 'id'> & Document
      token: string
    }
  }
}
export declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number
      APP_URL: string
      CLIENT_URL: string
      MONGODB_URI: string
      JWT_SECRET: string
      JWT_EXPIRATION: string
      MAIL_HOST: string
      MAIL_PORT: number
      MAIL_USER: string
      MAIL_PASSWORD: string
      MAIL_TPL_PATH: string
      STORAGE_PATH: string
      API_LOG_FILENAME: string
    }
  }
}

