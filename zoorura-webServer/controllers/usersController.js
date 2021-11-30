import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

import {UsersModel} from '../models/usersModel.js';


export const login = async (req,res) => {
 const {email, password} = req.body
 try{
     //const existingUser = await UsersModel.findOne({userName}); 
     const existingEmail = await UsersModel.findOne({email}); 
     
    // if(!existingUsername && !existingEmail) return res.status(404).json({message:"User doesn't exist."});
     if(!existingEmail) return res.status(404).json({message:"User Email doesn't exist."});

     //const isPasswordCorrectU = await bcrypt.compare(password, existingUsername.password);
     const isPasswordCorrectE = await bcrypt.compare(password, existingEmail.password);
     
     //if(!isPasswordCorrectU || !isPasswordCorrectE) return res.status(400).json({message:"invalid credentials"});
     if(!isPasswordCorrectE) return res.status(400).json({message:"invalid credentials"});
     
     const token = jwt.sign({email: existingEmail.email, id: existingEmail._id}, JWT_SECRET, {expiresIn: "1h"});

    res. status(200).json({result: existingEmail, token});

    

 } catch (error){
     res.status(500).json({message: 'Something went wrong'});
 }
}
export const register = async (req,res) => {
    
    const {firstName, lastName, userName, email, password, confirmPassword} = req.body;
    try {
        const existingUser = await UsersModel.findOne ({userName});
        const existingEmail = await UsersModel.findOne ({email});

         if(existingUser) return res.status(400).json({message:"Username Taken."});
         
         if(existingEmail) return res.status(400).json({message:"Email Taken."});

         if(password !== confirmPassword) return res.status(400).json({message: 'passwords dont match'});

         const hashedPassword = await bcrypt.hash (password, 12);

         const result = await UsersModel.create({email, userName, password: hashedPassword, name :`${firstName} ${lastName}`});

         const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "1h"});

         res.status(200).json({result, token});
    } catch (error) { 
       res.status(500).json({message: 'Something went wrong'});  
    }
}