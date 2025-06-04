const {Server} = require('socket.io');
const Chat = require('./models/chat');

function initSocket(server){
    const io = new Server(server, {
        cors: {
            origin: '*', 
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New Client Connected:', socket.id);

        socket.on('joinRoom', async ({userId, dentistId}) => {
            const roomId = `${Math.min(userId, dentistId)} - ${Math.max(userId, dentistId)}`;
            socket.join(roomId);
            console.log(`Socket ${socket.id} joined room ${roomId}`);

            try{
                const previousMessages = await Chat.findAll({
                    where: {
                        userId,
                        dentistId
                    },
                    order: [['timestamp', 'ASC']]
                });
                socket.emit('chatHistory', previousMessages);
            }
            catch(err){
                console.log('Error fetching chat history: ', err.message);
            }
        });

        socket.on('send_message', async (msgData) => {
            const {userId, dentistId, text, sentBy} = msgData;
            const timestamp = new Date();
            try{
                const message = await Chat.create({
                    userId,
                    dentistId,
                    text,
                    sentBy,
                    timestamp
                });
                const roomId = `${Math.min(userId, dentistId)} - ${Math.max(userId, dentistId)}`;
                io.to(roomId).emit('receive_message', message);
            }
            catch(err){
                console.error('Failed to save message:', err.message);
            }
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected: ', socket.id);
        });
    });
    return io;
}

module.exports = initSocket;