import User from '../interfaces/IUser';
import createuserSchema from'../model/schema/userSchema';
import bcrypt from "bcrypt"
import  userResponse  from '../api/response/userResponse';
class createUserService {
    public static(user: User): userResponse {
        return new userResponse(user.username, user.email);
    }

    async createUser(userdata: User) {
        const {username, email, password, role: user} = userdata;
        const existingUser = await createuserSchema.findOne({$or: [{username}, {email}]});
        if (existingUser) {
            throw new Error('user already exist');
        }
        let hashedPassword;
        try {
            // @ts-ignore
            hashedPassword = await bcrypt.hash(password, String, 10);
        } catch (error) {
            console.error(error)
            throw new Error('Failed to hash password')
        }

    }
}
