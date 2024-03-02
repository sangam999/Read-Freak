import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { AuthService } from "./AuthService";
import { UserRole } from "./User";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/signup", async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).send("Username, password, and role are required");
    }
    try {
        const user = await AuthService.signUp(username, password, role);
        res.json(user);
    } catch (error) {
        res.status(500).send("Error signing up");
    }
});

app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }
    try {
        const token = await AuthService.login(username, password);
        if (token) {
            res.json({ token });
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        res.status(500).send("Error logging in");
    }
});

app.get("/profile", async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decodedToken = await AuthService.verifyToken(token);
        if (decodedToken) {
            res.json({ userId: decodedToken.userId, role: decodedToken.role });
        } else {
            res.status(401).send("Invalid token");
        }
    } catch (error) {
        res.status(500).send("Error verifying token");
    }
});

app.get("/admin", async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decodedToken = await AuthService.verifyToken(token);
        if (decodedToken && decodedToken.role === UserRole.ADMIN) {
            res.send("Admin dashboard");
        } else {
            res.status(403).send("Access forbidden");
        }
    } catch (error) {
        res.status(500).send("Error verifying token");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
