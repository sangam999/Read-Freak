import User from '../interfaces/IUser';
import createuserSchema from'../model/schema/userSchema';
import bcrypt from "bcrypt"
import  userResponse  from '../api/response/userResponse';
import createUserService from "./createUserservices";
class createUserService{
    public static transformUserResponse(user: User): userResponse {
        return new userResponse(user.username, user.email);
    }
    async createUser(userdata: User){
        const {username, email , password, role} = userdata;
        const  existingUser = await createuserSchema.findOne({ $or:[{username},{email}]});
        if (existingUser) {
            throw new Error('user already exist');
        }
        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash( password,10);
        }
        catch (error) {
            console.error(error)
            throw new Error('Failed to hash password')
        }
        const newUser = new createuserSchema({ username, email , password: hashedPassword,role:{"user":"admin"} }),
        const newUser.save(),
        return  newUser,
    }
}
export default createUserService;