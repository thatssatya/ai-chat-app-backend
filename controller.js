const { OpenAIApi, Configuration } = require('./openai');

const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.apiKey,
});

const openai = new OpenAIApi(configuration);

async function handlePost(req, res) {
    try {
        const { person, mood, message, tokens } = req.body;
        console.log(`User wants to have conversation with ${person} ${mood ? `in ${mood} mood` : ''}\n\nUser: ${message}`);

        const response = await openai.createCompletion({
            model: process.env.openaiModel,
            prompt: buildConversation(person, mood, message, tokens),
            max_tokens: 30,
            temperature: 0,
        });

        const msg = response.data.choices[0].text.trim();
        console.log(`${person}: ${msg}`)
        res.json({ message: msg });

    } catch (err) {
        res.json({ message: 'Having a break right now, brb in some time...' });
        console.log(err);
    }
}

function handleGet(req, res) {
    res.send('Backend server working!');
}

function buildConversation(person, mood, message, tokens) {
    const pretend = `Pretend you are ${person}.`;
    const moodString = mood ? `Reply as if you are in ${mood} mood` : '';
    const context = 'While replying, keep the context of the whole conversation.';
    const limit = `Your reply should be in under ${tokens} tokens with complete sentences.`;

    return `${pretend} ${moodString} ${context} ${limit}
            ${person}: How're you?
            Person: Cool, what about you?
            ${person}: Awesome! Let's have a chat.
            Person: ${message}
            ${person}:`;
}

module.exports = { handlePost, handleGet };