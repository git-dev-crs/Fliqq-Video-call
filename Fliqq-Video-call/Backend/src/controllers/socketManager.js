import { Server } from "socket.io"

let connections = {}
let messages = {}
let timeOnline = {}
let socketToRoom = {} // Optimization: Reverse lookup for O(1) access

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("SOMETHING CONNECTED: ", socket.id)

        socket.on("join-call", (path) => {
            try {
                if (connections[path] === undefined) {
                    connections[path] = []
                }
                connections[path].push(socket.id)
                socketToRoom[socket.id] = path; // Map socket to room

                timeOnline[socket.id] = new Date();

                // Notify existing users in the room
                for (let a = 0; a < connections[path].length; a++) {
                    io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
                }

                // Send chat history
                // if (messages[path] !== undefined) {
                //     io.to(socket.id).emit("chat-history", messages[path])
                // }
            } catch (e) {
                console.error(`Error in join-call for socket ${socket.id}:`, e);
            }
        })

        socket.on("signal", (toId, message) => {
            try {
                io.to(toId).emit("signal", socket.id, message);
            } catch (e) {
                console.error(`Error in signal for socket ${socket.id}:`, e);
            }
        })

        socket.on("chat-message", (data, sender) => {
            try {
                const room = socketToRoom[socket.id];

                if (room && connections[room]) {
                    if (messages[room] === undefined) {
                        messages[room] = []
                    }

                    messages[room].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                    console.log("message", room, ":", sender, data)

                    // Broadcast to everyone in the room
                    connections[room].forEach((elem) => {
                        io.to(elem).emit("chat-message", data, sender, socket.id)
                    })
                } else {
                    console.warn(`Socket ${socket.id} tried to send message but is not in a room.`);
                }
            } catch (e) {
                console.error(`Error in chat-message for socket ${socket.id}:`, e);
            }
        })

        socket.on("disconnect", () => {
            try {
                const room = socketToRoom[socket.id];

                if (room && connections[room]) {
                    // var diffTime = Math.abs(timeOnline[socket.id] - new Date()) // Useful for analytics later

                    // Notify others in the room
                    connections[room].forEach(elem => {
                        if (elem !== socket.id) {
                            io.to(elem).emit('user-left', socket.id)
                        }
                    });

                    // Remove from connections array
                    var index = connections[room].indexOf(socket.id)
                    if (index !== -1) {
                        connections[room].splice(index, 1)
                    }

                    // Cleanup if room is empty
                    if (connections[room].length === 0) {
                        delete connections[room]
                        delete messages[room] // Optimization: Free memory
                    }

                    // Cleanup metadata
                    delete socketToRoom[socket.id];
                    delete timeOnline[socket.id];

                    console.log(`Socket ${socket.id} disconnected from room ${room}`);
                } else {
                    // Cleanup metadata even if room finding failed (orphan socket)
                    delete timeOnline[socket.id];
                    if (room) delete socketToRoom[socket.id];
                    console.log(`Socket ${socket.id} disconnected (no active room found)`);
                }
            } catch (e) {
                console.error(`Error in disconnect for socket ${socket.id}:`, e);
            }
        })
    })

    return io;
}