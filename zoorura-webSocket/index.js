const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

server.listen(8900, () => console.log("Socket Server Running:8900"))


// const io = require("socket.io")(8900, {
//     cors:{
//         origin:'http://localhost:3000',
//     },
// });

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
     
    // When Disconnect
    socket.on("disconnect", () =>{
    console.log("a user disconnected");
    removeUser(socket.id);      
    io.emit("getUsers", users);
    console.log(users);
        
    });

    // CALLS SOCKETS============

    //Call User
    socket.on("callUser", ({socketCallerData})=>{
            try{

            console.log(users);
            console.log(socketCallerData);
            console.log(socketCallerData.receiverId);
            const receiver = getUser(socketCallerData.receiverId);
            console.log(receiver);

                io.to(receiver.socketId).emit("incomingCall", { 
                    
                    ...socketCallerData

                });
            }catch(error){

                console.log(error.message);

            }
    });

      //Pick Call
      socket.on("pickCall", ({socketPickerData})=>{
        try{
 
        console.log(users);
        console.log(socketPickerData);
        console.log(socketPickerData.receiverId); //Receiver of Socket not of call
        const receiver = getUser(socketPickerData.receiverId);
        console.log(receiver);
        const signal = socketPickerData.signal;

            io.to(receiver.socketId).emit("callPicked", (signal));
        }catch(error){

            console.log(error.message);

        }
});





    
    //Send and Get Message
    socket.on("sendMessage", ({socketMessageData})=>{
        try{
                ///HAVE a function to verify things eg if senders socket is same as data socket maybe.
        console.log(users);
        console.log(socketMessageData);
        console.log(socketMessageData.receiverId);
        const receiver = getUser(socketMessageData.receiverId);
        console.log(receiver);

            io.to(receiver.socketId).emit("getMessage", { 
                
                ...socketMessageData

            });
        }catch(error){

            console.log(error.message);

        }
    });

      //Send and Tip Message NOT ACTUAL PATCH ONLY
      socket.on("patchMessage", ({socketMessageData})=>{
        try{

        console.log(socketMessageData);
       
        const receiver = getUser(socketMessageData.senderId); //Because Message Sender owns the Message to be Patched
        console.log(receiver);

            io.to(receiver.socketId).emit("getPatchedMessage", {
                
                ...socketMessageData

            });
        }catch(error){

            console.log(error.message);

        }
    });

    //Send and Get Notification
    socket.on("sendNotification", ({socketNotificationData})=>{
        try{

            //console.log(users);
            console.log('socket notified');
            //console.log(socketNotificationData);
            //console.log(socketNotificationData.receiver);
            const receiver = getUser(socketNotificationData.receiver);
           // console.log(receiver);

            io.to(receiver.socketId).emit("getNotification", {
              
                ...socketNotificationData

        });
        }catch(error){

            console.log(error.message);

        }
    });

    //Typing
     socket.on("sendTypingMessage", ({typingMessageData})=>{
        try{

        console.log(users);
        console.log(typingMessageData);
        console.log(typingMessageData.receiverId);
        const receiver = getUser(typingMessageData.receiverId);
        console.log(receiver);

            io.to(receiver.socketId).emit("getTypingMessage", {
                
                convoId:typingMessageData.convoId,
                senderId:typingMessageData.senderId,
                receiverId:typingMessageData.receiverId,

            });
        }catch(error){

            console.log(error.message);

        }
    });

     //User Online
     socket.on("checkUserOnline", ({checkData})=>{
        try{

        console.log(users);
        console.log(checkData);
        const checked = getUser(checkData.checkedId);
        const checker = getUser(checkData.checkerId);
        console.log(checker);

                if(checked){
                    if(checked.socketId.length>0){

                        io.to(checker.socketId).emit("checkedUserOnline", {
                            
                            checkedId: checkData.checkedId,
                            checkerId: checkData.checkerId

                        });
                        console.log('online')

                    }else{
                        io.to(checker.socketId).emit("checkedUserOflline", {
                            
                            checkedId: checkData.checkedId,
                            checkerId: checkData.checkerId

                        });
                    }
                }else{
                    if(checker){

                            io.to(checker.socketId).emit("checkedUserOffline", {
                            
                            checkedId: checkData.checkedId,
                            checkerId: checkData.checkerId

                        
                        });
                    }
                    console.log('offline')
                }
           

        }catch(error){

            console.log(error.message);

        }
    });

    //Review
    socket.on("sendReview", ({reviewData})=>{
        try{

  
       // console.log(reviewData);
       
        const receiver = getUser(reviewData.reviewedMiniProfile);
       // console.log(receiver);

            io.to(receiver.socketId).emit("getReview", {
                
                ...reviewData
 
            });
        }catch(error){ 

            console.log(error.message);
 
        }
    });
     //ReviewReply
     socket.on("replyReview", ({reviewData})=>{
        try{

  
        console.log(reviewData.repliedMiniProfile);
        console.log('reply review');
       
        const receiver = getUser(reviewData.repliedMiniProfile);
       console.log('REPLYRECEIVER:' + receiver);

            io.to(receiver.socketId).emit("getReplyReview", {
                
                ...reviewData
 
            });
        }catch(error){ 

            console.log(error.message);

        }
    });
     //Convo
     socket.on("sendConvo", ({socketConvoData})=>{
        try{

        console.log(socketConvoData);
        console.log('convoreqsent')
       
        const receiver = getUser(socketConvoData.guest._id);

            io.to(receiver.socketId).emit("getConvo", {
                
                ...socketConvoData
 
            });
        }catch(error){ 

            console.log(error.message);

        }
    });
    
    
    
  
});