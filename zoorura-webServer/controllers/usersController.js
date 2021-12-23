import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebaseBack/config.js";

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

import {UsersModel} from '../models/usersModel.js';

import nodemailer from "nodemailer";

//nodemailer transporter
 let transporter = nodemailer.createTransport({
   host: 'zoorura.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL, 
        pass: process.env.AUTH_PASS,          
    }
  });

  const sendVerifyEmail = (email) => {
      const mailOptions = {
        from: 'Zoorura <noreply@zoorura.com>', 
        to: email, 
        subject: "Zoorura Email Verification Testing", 
        //text: "Testing", 
        html: '<b>You opened an account on Zoorura. This is a test Email to verify its you.</b>', 
      }
      transporter.sendMail(mailOptions);
  }
//<p><img src="https://zoorura.com/home/assets/images/logo-light.png" width="300" height="93" /></p>

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
     
     const token = jwt.sign({email: existingEmail.email, id: existingEmail._id}, JWT_SECRET, {expiresIn: "12h"});

    res. status(200).json({result: existingEmail, token});

    try{ 
        sendVerifyEmail (email);
    } catch (err){
        console.log(err.message);
    }

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

         //Firebase Stuff
        try{
            createUserWithEmailAndPassword (auth, email, password)
            .then(response=> {
                console.log(response);
              //  sendPasswordResetEmail (auth, email, {url: 'http://localhost:3000/'});
            })
            .catch(error => {
                console.log(error.message)
            })
         
        } catch (error){
            res.status(500).json({message: 'Something went wrong'});  
            UsersModel.findOneAndDelete ({email});
        }

         const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "12h"});
         res.status(200).json({result, token});
    } catch (error) { 
       res.status(500).json({message: 'Something went wrong'});  
    }
}