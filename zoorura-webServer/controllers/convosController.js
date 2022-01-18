import {ConvosModel} from "../models/convosModel.js";
import {MessagesModel} from "../models/messagesModel.js";
import  mongoose  from "mongoose"; 

export const getConvos = async  (req, res) => {
    const{id} = req.params;
    console.log(id);
    try{ 
        const convos = await ConvosModel.find({members: { $in: [ id ] } }).sort({"dateRank":-1})
        .populate('host', 'dpUrl userName')
        .populate('guest', 'dpUrl userName')
        .populate('members', 'dpUrl userName');
        console.log(convos);
        res.status(200).json(convos);  
        
   } catch(error){
       res.status(404).json({message: error.message});
   }
 };

 export const postConvo = async  (req, res) => {
    const{type, members,tip} = req.body;
    // console.log('TYPE: ' + type);
    // console.log('MEMBERS: ' + members);
    // console.log("tip: "+ tip);
    try{  

        if (type === '2'){

            const{host, guest, members, type, tip, intro} = req.body;
            
            const newConvo = await ConvosModel.create({members:members, guest:guest, host: host, createdOn: new Date(), dateRank: Date.now(), type: type, tip:tip});

            console.log("CONVO MEM: "+ newConvo);
            
            const introMessage = await MessagesModel.create({convoId:newConvo._id, senderId: newConvo.host, receiverId:newConvo.guest, body: intro });
            
            const newConvoPopulated = await ConvosModel.findById(newConvo._id)
            .populate('host', 'dpUrl userName')
            .populate('guest', 'dpUrl userName')
            .populate('members', 'dpUrl userName');

            res.status(200).json(newConvoPopulated);
            console.log("CONVO MEM: "+ newConvoPopulated);
            console.log('INTROMSG DATABASE:' +introMessage);
            

         } else if(type === 'many') {

            const{host, members, title, dpUrl, type} = req.body;
            const newConvo = await ConvosModel.create({host: host, members:members, guest:null, title:title, dpUrl:dpUrl, createdOn: new Date(), dateRank: Date.now(), type: type, tip:tip});   
                console.log("Convo Created: "+ newConvo);
                res.status(200).json(newConvo);  
         } else {
             console.log("error")
            res.status(400).json("Dont Manipulate HTML");  
         }
         
    } catch(error){
        res.status(404).json({message: error.message});
    }
 };