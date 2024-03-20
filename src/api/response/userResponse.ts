  import mongoose from "mongoose";

  export default class userResponse {
      _id?: string;
      username: string;
      email: string;
      password?: string;
      role?: ("user" | "admin")[];
      isActive: boolean;

      constructor(
          username: string,
          email: string,
          _id?: string,
          password?: string,
          role?: ("user" | "admin")[],
          isActive: boolean = true // Assuming isActive defaults to true
      ) {
          this._id = _id;
          this.username = username;
          this.email = email;
          this.password = password;
          this.role = role;
          this.isActive = isActive;
      }
  }
