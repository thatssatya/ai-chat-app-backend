require('dotenv').config();
const port = process.env.port;
const app = require('./src/app')

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
