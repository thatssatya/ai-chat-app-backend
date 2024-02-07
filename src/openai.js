const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.apiKey,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;