import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Application = express();

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/book_review_system', {
    ALPNProtocols: undefined,
    appName: "",
    auth: undefined,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
