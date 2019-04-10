const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('io')(server);

io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

//conectando com bd
mongoose.connect('mongodb+srv://alexjr:leko001993@cluster0-uhi2h.mongodb.net/omnistack?retryWrites=true', { useNewUrlParser: true });

app.use((res, req, next) => {
    req.io = io;

    return next();
})

//dizendo que nossas requisicoes sera json
app.use(express.json());
//permite que sejam enviados arquivos nas requisicoes
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3030);