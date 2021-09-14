import "regenerator-runtime";
import "dotenv/config";
import app from './app';
import "./db";
import "./models/Member";
import "./models/Leader";

const PORT = 5000;

const handleListening = () => {
    console.log(`💟server listening on http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);