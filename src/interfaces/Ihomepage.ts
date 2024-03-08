import mongoose from "mongoose"
    import User from "./IUser";

    export default interface IHomePage {
    banner: String;
    recommendations:string;
    whistLists:string;
    recentActivity: string;

}