const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const port = process.env.PORT || 3000;
const ErrorHandle = require('./services/ErrorHandle');

const app = express();

const initialize = () => {
    app.use(bodyParser.json());
    app.use(cors());
    
    app.use('/auth', authRouter);
    app.use('/api', apiRouter);
    
    app.listen(port, () => {
        ErrorHandle.log(`Server running on port: ${port}`);
    });
}

initialize();