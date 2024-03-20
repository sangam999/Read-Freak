import User from '../interfaces/IUser';
import { Request} from "express";

export interface ReqWithUser extends Request {
    user?: User;
}