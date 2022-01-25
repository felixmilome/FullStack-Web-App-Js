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
    console.log(users);

}
const getUser = (userId) => {
    console.log(users);
    // console.log(users.find(user => user.userId === userId));
    return users.find(user => user.userId === userId);
    

}

const removeUser = (socketId) =>{
    users = users.filter(user=>user.socketId !== socketId)
}

io.on("connection", (socket)=> {
    console.log("a user connected.");
    
    //Get userId and socketId from User
    socket.on("addUser", userId =>{
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
    
    //Send and Get Message
    socket.on("sendMessage", ({messageData})=>{
        console.log(users);
        console.log(messageData);
        console.log(messageData.receiverId);
        const receiver = getUser(messageData.receiverId);
        console.log(receiver);
        io.to(receiver.socketId).emit("getMessage", {
           convoId:messageData.convoId,
           senderId:messageData.senderId,
           receiverId:messageData.receiverId,
           body:messageData.body,
           createdOn:new Date(),
           dateRank:Date.now(),
        });
    });
    
    
    
    // When Disconnect
    socket.on("disconnect", () =>{
        console.log("a user disconnected");
        removeUser(socket.id);      
        io.emit("getUsers", users);
        console.log(users);
        
    });
});