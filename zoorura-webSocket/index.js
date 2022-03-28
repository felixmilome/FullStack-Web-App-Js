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
    
    // When Disconnect
    socket.on("disconnect", () =>{
    console.log("a user disconnected");
    removeUser(socket.id);      
    io.emit("getUsers", users);
    console.log(users);
        
    });
    
    //Send and Get Message
    socket.on("sendMessage", ({messageData})=>{
        try{

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
                file:messageData.file,
                type:messageData.type,
                createdOn:new Date(),
                dateRank:Date.now(),

            });
        }catch(error){

            console.log(error);

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
              
                sender:socketNotificationData.sender,
                receiver:socketNotificationData.receiver,
                body:socketNotificationData.body,
                postId:socketNotificationData.postId,
                tipAmount:socketNotificationData?.tipAmount,
                read:false, 
                type:socketNotificationData.type,
                createdOn:new Date(),
                dateRank:Date.now(), 

        });
        }catch(error){

            console.log(error);

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

            console.log(error);

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

            console.log(error);

        }
    });

    //Review
    socket.on("sendReview", ({reviewData})=>{
        try{

  
        console.log(reviewData);
       
        const receiver = getUser(reviewData.reviewedMiniProfile);
       // console.log(receiver);

            io.to(receiver.socketId).emit("getReview", {
                
                reviewData
 
            });
        }catch(error){ 

            console.log(error);

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