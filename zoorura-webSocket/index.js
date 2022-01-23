const io = require("socket.io")(8900, {
    cors:{
        origin:'http://localhost:3000',
    },
});

let users=[];

const addUser = (userId, socketId) => { 
    !users.some((user)=> user.userId === userId) &&
    users.push({userId, socketId});
    console.log(userId);

}
const getUser =(userId) => {
    return users.find(user => user.userId === userId);

}

const removeUser = (socketId) =>{
    users= users.filter(user=>user.socketId !== socketId)
}

io.on("connection", (socket)=> {
    console.log("a user connected.");
    
    //Get userId and socketId from User
    socket.on("addUser", userId =>{
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
    
    //Send and Get Message
    socket.on("sendMessage",({messageData})=>{
        console.log(messageData);
        // const receiver = getUser(messageData.receiverId);
        // io.to(receiver.socketId).emit("getMessage", {
        //     senderId,
        //     text,
        // });
    });
    
    
    
    // When Disconnect
    socket.on("disconnect", () =>{
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});