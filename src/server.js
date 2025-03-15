import ChatbubbleObject from "./ChatbubbleObject.js";

import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5000;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CHATPATH = path.resolve(__dirname);

app.use(cors()); 
app.use(express.json()); 

function readTextFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


app.get('/api/message/:listSize', async (req, res) => {
    const listSize =  Number(req.params.listSize);
    let messages = [];
    try {
        const data = await readTextFile(CHATPATH + '/ChatOverlay.txt');
        var lines = data.split('\n');
        var readingLastLine = await readTextFile(CHATPATH + '/ChatLastLine.txt');
        var lastLines = (listSize < 1 || lines.length <= listSize)
            ? readingLastLine
            : lines.length - listSize - 1;

        for (let i = (lines.length - 10); i < lines.length; i++) {
            if (i > lastLines) {
                const line = lines[i];
                let [info1, info2, info3, info4, info5, info6, info7] = line.split(":%:").map(item => item.trim());
                messages.push(new ChatbubbleObject(info1, info2, info3, info4, info5, info6, (lines.length - 10 + i)));
            }
        }
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Error reading file');
    }

    res.json({ message: messages, status: "success" });
});

app.get('/api/setlastmessage/:number', (req, res) => {
    const number = req.params.number;

    fs.writeFile((CHATPATH + '/ChatLastLine.txt'), number, "utf8", (err) => {
        if (err) {
            console.error("Error writing to file", err);
        }
    });

    if (isNaN(number)) {
        return res.status(400).json({ error: 'Invalid number' });
    }

    res.json({ receivedNumber: number });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
