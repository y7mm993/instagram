const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // مجلد "public" يحتوي على ملفات HTML وCSS وJavaScript

io.on('connection', (socket) => {
    console.log('مستخدم متصل:', socket.id);

    socket.on('offer', (data) => {
        // استقبال بيانات العرض (offer) وإرسالها لجميع المستخدمين
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        // استقبال الإجابة (answer) وإرسالها لجميع المستخدمين
        socket.broadcast.emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
        // استقبال مرشحات ICE وإرسالها لجميع المستخدمين
        socket.broadcast.emit('ice-candidate', data);
    });

    socket.on('disconnect', () => {
        console.log('مستخدم فصل الاتصال:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('الخادم يعمل على المنفذ 3000');
});
