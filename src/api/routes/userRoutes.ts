import express, { Request, Response } from 'express';

import User from '../../interfaces/IUser';
import { authService } from '../../services/authServices';


const router = express.Router();

class createUserService {

    constructor(user: any) {

    }

    createUser(arg0: { username: string; email: string; password: string; role: any; }) {
        throw new Error('Method not implemented.');
    }
}

let user;
let UserService: { createUser: (arg0: { username: string; email: string; password: string; role: any; }) => any; };
UserService = new createUserService.(user);

const usernameRegex: RegExp = /^[a-zA-Z_]+$/;
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



router.post("/login", async (req: Request, res: Response, createUserService) => {

    try {
        const { email, password } = req.body as User;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                Message: "please fill the detiail",
            });
        }
        const { user, token } = await authService.login(email, password)


        let Response: any;
        Response = createUserService(user);

        return res.json({ Response, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "login fail INVALID CREDENTIAL",
        });
    }

})
router.post("/signup",
    async (req: Request, res: Response) => {
        const {username, email, password, role} = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({error: 'Username and email are required'})
        }
        if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== "string") {
            return res.status(400).json({error: 'Invalid username or email'})
        }
        if (!usernameRegex.test(username)) {
            return res.status(400).json({error: 'Invalid username format'});
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({error: 'Invalid email address'});
        }
        if (!emailRegex.test(role)) {
            return res.status(400).json({error: 'Invalid role'});
        }
        try {
            const data = await UserService.createUser({
                username, email, password, role
            });

            // @ts-ignore
            const Response = createUserService.void(data);
            res.status(201).json({
                Response,
                messaage: "user created successfully"
            });
        } catch (error: any) {
            console.error(error.message)
            res.status(500).json({error});
        }

    })
export default router;