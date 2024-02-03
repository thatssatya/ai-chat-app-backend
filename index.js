const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.port;

const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.apiKey,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.post('/', async (req, res) => {
    const { person } = req.body;
    const { mood } = req.body;
    const { message } = req.body;
    const { tokens } = req.body ? req.body : 30;

    console.log(`User wants to have conversation with ${person} in ${mood} mood: ${message}`);

    let conversation = `Pretend you are ${person}. 
    Reply as if you are ${mood ? mood : person}.
    While replying, keep the context of the whole conversation.
    Your reply should be in under ${tokens} tokens with complete sentences.
    
    ${person}: How're you?
    Person: Cool, what about you?
    ${person}: Awesome! Ask me a question.
    Person: ${message}
    ${person}:`;

    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo-instruct",
            prompt: conversation,
            max_tokens: 30,
            temperature: 0,
        });

        if (response.data) {
            if (response.data.choices[0].text) {
                res.json({ message: response.data.choices[0].text.trim() });
            }
        }
    } catch (err) {
        res.json({ message: 'Having a break right now, brb in some time...' });
        console.log(err);
    }
});

app.get('/', (req, res) => {
    res.send('Backend server working!');
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
