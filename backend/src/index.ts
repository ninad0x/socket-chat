import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on("connection", function(socket) {
    console.log("User Connected")

    socket.on("message", (message: string) => {

        const parsedMessage = JSON.parse(message)

        console.log(parsedMessage.payload.message);
        

        if (parsedMessage.type === "join") {

            allSockets.push({
                socket: socket,
                room: parsedMessage.payload.roomId
            })
            
            console.log("users are  ",allSockets);
            
        }

        if (parsedMessage.type === "chat") {
            const currentUserRoom = allSockets.find((x) => x.socket == socket)?.room

            // console.log("currentUserRoom  ", currentUserRoom);
            
            // allSockets.forEach((x) => x.socket.send(parsedMessage.payload.message))

            // @ts-ignore
            // console.log("result  ",
             allSockets
                .filter((x) => x.room == currentUserRoom)   // gives all red
                .forEach((x) => x.socket.send(parsedMessage.payload.message))   // sends msg   
            // )
        }


    })
})