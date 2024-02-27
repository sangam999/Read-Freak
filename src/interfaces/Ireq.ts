import User from '../interfaces/IUser';


export default interface ReqWithUser extends Request {
    req: User;
    cookies: any;
    user?: User;
}