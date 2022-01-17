import {ConvosModel} from "../models/convosModel.js";
import  mongoose  from "mongoose"; 

export const getConvos = async  (req, res) => {
    const{id} = req.body;
    try{ 
        const convos = await ConvosModel.find({members: { $in: [ id ] } }).sort({"pinner":-1, "updatedOn":-1})
        .populate('host', 'dpUrl userName')
        .populate('members', 'dpUrl userName');
        console.log(convos);
        res.status(200).json(convos); 
        
   } catch(error){
       res.status(404).json({message: error.message});
   }
 }

export const postConvo = async  (req, res) => {
    const{type, members,tip} = req.body;
    console.log('TYPE: ' + type);
    console.log('MEMBERS: ' + members);
    console.log("tip"+ tip);
    try{  

        if (type === '2'){

            const{host, members, type, tip} = req.body;

           // const newConvo = await ConvosModel.create({$push: { members: {$each: [members]}}, $set: {host: host, createdOn: new Date(),  type: type, tip:tip}});
           const newConvo = await ConvosModel.create({members:members, host: host, createdOn: new Date(), type: type, tip:tip});
                console.log("NEW CONVO MEM: "+ newConvo);
                res.status(200).json(newConvo);

         } else {

            const{host, members, title, dpUrl, type} = req.body;

        //const newConvo = await ConvosModel.create({$push: { members: {$each: [members]}}, $set: {host:host, title:title, dpUrl:dpUrl, createdOn: new Date(),  type: type}});
        const newConvo = await ConvosModel.create({members:members, host: host, createdOn: new Date(), type: type, tip:tip});   
            console.log("Convo Created: "+ newConvo);
            res.status(200).json(newConvo);  
         }
         
    } catch(error){
        res.status(404).json({message: error.message});
    }
 }