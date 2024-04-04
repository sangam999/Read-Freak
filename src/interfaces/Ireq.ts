import {IUser} from '../interfaces/IUser';
import { Request} from "express";

export interface ReqWithUser extends Request {
    user: IUser;
}