import "dotenv/config";
import app from './app';
import "./db";
import "./models/Member"

const PORT = 4000;

const handleListening = () => {
    console.log(`💟server listening on http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);