const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const https = require('https');
// const fs = require('fs');

const app = express();
const port = 3001;

require('dotenv').config();

const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.apiKey,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { person } = req.body;
    const { mood } = req.body;
    const { message } = req.body;
    const { tokens } = req.body ? req.body : 30;

    let conversation = `Pretend you are ${person}. 
    Reply as if you are ${mood ? mood : person}.
    While replying, keep the context of the whole conversation.
    Your reply should be in under ${tokens} tokens.
    
    ${person}: How're you?
    Person: Cool, what about you?
    ${person}: Awesome! Ask me a question.
    Person: ${message}
    ${person}:`;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: conversation,
        max_tokens: 30,
        temperature: 0,
    });

    console.log('\nChat session with: ' + person);
    if (mood)
        console.log('Mood: ' + mood);
    console.log('Message: ' + message);

    if (response.data) {
        if (response.data.choices[0].text) {
            res.json({ message: response.data.choices[0].text.trim() });
            console.log('Reply: ' + response.data.choices[0].text.trim());
        }
    }
});

app.get('/', (req, res) => {
    res.send('Backend server working!');
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});

// var options = {
//     key: fs.readFileSync('./tls.key'),
//     cert: fs.readFileSync('./tls.crt'),
// }

// server = https.createServer(options, app);

// server.listen(port, () => {
//     console.log(`Example app listening at https://localhost:${port}`);
// });
