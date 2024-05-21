import  { Request, Response, Router } from "express";
import { AuthService } from "../../services/authServices";
import {auth} from "../middlewear/Auth";


export default (app: Router) => {
    const authService = new AuthService();

    app.post("/signup", async (req: Request, res: Response) => {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).send("Username, password, and email are required");
        }
        try {
            const user = await authService.signUp(username, password, email);
            res.json(user);
        } catch (error) {
            console.error("Error signing up:", error);
            res.status(500).send("Error signing up");
        }
    });

    app.post("/login", async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("email and password are required");
        }
        try {
            // Call the login function from authService
            const tokenData = await authService.login(email, password);
            // If login is successful, token will be set in cookies automatically
            res.json(tokenData);
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).send("Error logging in");
        }
    });

    app.get("/profile", async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        try {
            const decodedToken = await authService.verifyToken(token);
            if (decodedToken) {
                res.json({ userId: decodedToken._id, role: decodedToken.role });
            } else {
                res.status(401).send("Invalid token");
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            res.status(500).send("Error verifying token");
        }
    });

    app.get("/admin", async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        try {
            const decodedToken = await authService.verifyToken(token);
            if (decodedToken && decodedToken.role === "admin") {
                res.send("Admin dashboard");
            } else {
                res.status(403).send("Access forbidden");
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            res.status(500).send("Error verifying token");
        }
    });
    // Logout route
    app.get("/logout", async (req: Request, res: Response) => {
        try {
            // Clear the authentication token by removing the cookie from the client
            res.clearCookie("token");
            res.json({ message: "Logout successful" });
        } catch (error) {
            console.error("Error logging out:", error);
            res.status(500).send("Error logging out");
        }
    });
}