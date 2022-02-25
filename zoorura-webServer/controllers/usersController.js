import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//import { uuid } from 'uuidv4';
import { v4 as uuid_v4 } from "uuid";

//import {createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebaseBack/config.js";

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

import {UsersModel} from '../models/usersModel.js';

import nodemailer from "nodemailer";

const filterItemOut = (key, { [key]: deletedKey, ...others }) => others;

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

  const sendVerifyEmail = async (remail, uniqueStr, userName, firstName, lastName) => {


      const mailOptions = {
        from: 'Zoorura <noreply@zoorura.com>', 
        to: remail, 
        subject: "Zoorura Email Verification Testing",
        html: `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Zoorura Email Verification</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              
              /*All the styling goes here*/
              
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; 
              }
        
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; 
              }
        
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; 
              }
        
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
        
              .body {
                background-color: #f6f6f6;
                width: 100%; 
              }
        
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; 
              }
        
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px; 
              }
        
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%; 
              }
        
              .wrapper {
                box-sizing: border-box;
                padding: 40px;
               
               
              }
        
              .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
              }
        
              .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%; 
              }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; 
              }
        
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px; 
              }
        
              h1 {
                font-size: 35px;
                font-weight: 500;
                text-align: center;
                text-transform: capitalize; 
              }
        
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px; 
              }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; 
              }
        
              a {
                color: #3498db;
                text-decoration: underline; 
              }
        
              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; 
              }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; 
              }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; 
              }
        
              .btn-primary table td {
                background-color: #3498db; 
              }
        
              .btn-primary a {
                background-color: #3498db;
                border-color: #3498db;
                color: #ffffff; 
              }
        
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; 
              }
        
              .first {
                margin-top: 0; 
              }
        
              .align-center {
                text-align: center; 
              }
        
              .align-right {
                text-align: right; 
              }
        
              .align-left {
                text-align: left; 
              }
        
              .clear {
                clear: both; 
              }
        
              .mt0 {
                margin-top: 0; 
              }
        
              .mb0 {
                margin-bottom: 0; 
              }
        
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; 
              }
        
              .powered-by a {
                text-decoration: none; 
              }
        
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0; 
              }
        
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table.body h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; 
                }
                table.body p,
                table.body ul,
                table.body ol,
                table.body td,
                table.body span,
                table.body a {
                  font-size: 16px !important; 
                }
                table.body .wrapper,
                table.body .article {
                  padding: 10px !important; 
                }
                table.body .content {
                  padding: 0 !important; 
                }
                table.body .container {
                  padding: 0 !important;
                  width: 100% !important; 
                }
                table.body .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; 
                }
                table.body .btn table {
                  width: 100% !important; 
                }
                table.body .btn a {
                  width: 100% !important; 
                }
                table.body .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; 
                }
              }
        
              /* -------------------------------------
                  PRESERVE THESE STYLES IN THE HEAD
              ------------------------------------- */
              @media all {
                .ExternalClass {
                  width: 100%; 
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; 
                }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; 
                }
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                  font-size: inherit;
                  font-family: inherit;
                  font-weight: inherit;
                  line-height: inherit;
                }
                .btn-primary table td:hover {
                  background-color: #34495e !important; 
                }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; 
                } 
              }
        
            </style>
          </head>
          <body class="">
          
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" border-radius= "25px">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                
                                <p>An account called @<b>${userName}</b> was created using this email in Zoorura. Enter the OTP Verification code below in your Zoorura App/Website to verify it's you. Expiry in 48hrs:</p>
                                
                                <h1>${uniqueStr}</h1>
                                
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Zoorura Technologies Ltd, Nairobi, Kenya</span>
                            <br> This is an auto generated email for @${userName}. Please do not reply
                            <br> Ignore if it is not you. Or <a href= "#"> report violation. </a>
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            Powered by Zoorura Technologies.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>` 
       
      }
      return transporter.sendMail(mailOptions);
  }


function getCodec() {
   // return Math.floor(Math.random() * 969696);
    return Math.floor(Math.random()*1e9).toString(32);
   };







  // CONTROLLERS==================================
  export const sendOtp = async (req,res) => {
    const id = req.userId;
    console.log('userId :' + id);
  
      try{ 
      
          const user = await UsersModel.findById(id);
          console.log(user);
          const {userName, email, firstName, lastName} = user;
  
            const uniqueStr = getCodec ();
            
            console.log(uniqueStr);
        
            const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
          
    
            const otpPatchedUser = await UsersModel.findByIdAndUpdate(id, {$set: {verCode: uniqueStrEncrypted}}, { new: true });
            console.log(otpPatchedUser);
            const emailSent = sendVerifyEmail (email,uniqueStr, userName, firstName, lastName);
            console.log(emailSent);

            if(emailSent){
              res.json({message:"sent"});
            }else {
              res.json({message:"error"});
            }
          
         
          
    
      } catch (error){
          res.json({message: 'error'});
      }
  }


  export const checkEmail = async (req,res) => {
    const {email} = req.params;
    console.log(email);
    if(email){
      try{ 
      
          const existingEmail = await UsersModel.findOne({email: { $in: [ email ] } });
          if (existingEmail){
          res.json("emailExists");
          }
          else if(!existingEmail){
            res.json("noEmail");
          }
          
    
      } catch (error){
          res.status(500).json({message: 'Something went wrong'});
      }
   }else{
     console.log('empty');
   }
  }
  
   export const checkUsername = async (req,res) => {
    const {username} = req.params;
    console.log(req.body);
    
   
      try{ 
      
          const existingUsername = await UsersModel.findOne({userName: { $in: [ username ] } }); 
          
          if (existingUsername){
            res.json("usernameExists");
            console.log(existingUsername);
          }
          else if(!existingUsername){
            res.json("noUsername");
          }
          
    
      } catch (error){
          res.status(500).json({message: 'Something went wrong'});
      }

  }


export const login = async (req,res) => {
 const {email, password, autologout} = req.body;
 console.log(req.body);
 try{ 
  
     const existingEmail = await UsersModel.findOne({email: { $in: [ email ] } });
     
     if(!existingEmail) return res.json({message:"LoginError"});

     const isPasswordCorrectE = await bcrypt.compare(password, existingEmail.password);
     
     if(!isPasswordCorrectE) return res.json({message:"LoginError"});
    
    
    if (existingEmail &&  isPasswordCorrectE){

      const loggedUser_Detailed = await UsersModel.findByIdAndUpdate(existingEmail._id, {jwtExpiry: autologout}, { new: true });
      const loggedUser = await UsersModel.findById(loggedUser_Detailed._id, {password:0, verCode:0});
      console.log(loggedUser);
      const token = jwt.sign({email: loggedUser.email, id: loggedUser._id}, JWT_SECRET, {expiresIn: autologout});
   
      res. status(200).json({result:loggedUser, token});

    }
     

 } catch (error){
     res.status(500).json({message: 'Something went wrong'});
 }
}
export const register = async (req,res) => {
    
    const {firstName, lastName, userName, email, password, confirmPassword} = req.body;
    try {
        const existingUser = await UsersModel.findOne ({userName: { $in: [ userName ] } });;
        const existingEmail = await UsersModel.findOne ({email: { $in: [ email ] } });;

        // console.log(existingEmail);

        //  if(existingUser) return res.status(400).json({message:"Username Taken."});
         
        //  if(existingEmail) return res.status(400).json({message:"Email Taken."});

        //  if(password !== confirmPassword) return res.status(400).json({message: 'passwords dont match'});

         if(existingUser && !existingEmail){

            return res.json({message:"UsernameTaken"});

          } else if (existingEmail && !existingUser) {

            return res.json({message:"EmailTaken"});

          }else if (existingEmail && existingUser) { 

            return res.json({message:"UsernameEmailTaken"});
  
          }else if(!existingEmail && !existingUser 
            && firstName.length > 1 && firstName.length < 16 && /^[aA-zZ]+$/.test(firstName) == true
            && lastName.length > 1 && lastName.length < 16 && /^[aA-zZ]+$/.test(lastName) == true
            && userName.length > 1 && userName.length < 31 && /^\d*[a-zA-Z][a-zA-Z\d]*$/.test(userName) == true
            && email.length > 2 && email.length < 41 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == true
            && password.length > 4 && password.length < 24 && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/.test(password) == true
            && confirmPassword === password   
            ){  
             
              const hashedPassword = await bcrypt.hash (password, 12);
              const uniqueStr = getCodec ();
              console.log(uniqueStr);
              const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
              
              const resultX = await UsersModel.create({email, userName, password: hashedPassword, name :`${firstName} ${lastName}`, verCode: uniqueStrEncrypted, verTime: Date.now(), verExpiry: Date.now() + 172800000});
              const result = await UsersModel.findById(resultX._id, {password:0, verCode:0});
                
              console.log(result);
              

                if (result) {
                    const remail = result.email;
                    sendVerifyEmail (remail,uniqueStr, userName, firstName, lastName);    
                    const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "12h"});
                    res.status(200).json({result, token});
                }

            }else{
              return res.json({message:"InputError"});
            }

        

    } catch (error) { 
       res.status(500).json({message: 'Something went wrong'});  
    }
  
}

export const verify = async(req,res) => {
    const {otp, email} = req.body
    //const user = await UsersModel.findOne ({email: { $in: [ email ] } });
     
    const id = req.userId;
    console.log(id);
   
    const user = await UsersModel.findById (id);
     console.log(user);
     const codeMatch = await bcrypt.compare(otp,user.verCode);
     console.log(codeMatch);
    
    if (codeMatch && user.verExpiry > Date.now ()){
        try {
        const verifiedUser = await UsersModel.findByIdAndUpdate (id, {verified: true, dailyLogin: Date.now()}, { new: true });
        

        const result = await UsersModel.findById(verifiedUser._id, {password:0, verCode:0});

        const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "12h"});
        res.status(200).json({result, token});
        console.log (result);
        console.log('verified');
        }
        catch(error){
            console.log(error.message);
        }

     }  else if (!codeMatch && user.verExpiry > Date.now()){
      res.json({message: "OtpError"});
    }else if (user.verExpiry < Date.now()){

         console.log ("expired");
         await UsersModel.findByIdAndRemove(id);
         res.json({message: "OtpExpired"});

    }else{
      res.json({message: "UnknownError"});
    }
}

export const changeDp = async(req,res) => {
 const {id, dp} = req.body;
 console.log(req.body);
 try{
  const updated_User_Profile = await UsersModel.findByIdAndUpdate (id, {dpUrl: dp}, { new: true });
  
  const result = await UsersModel.findById(updated_User_Profile._id, {password:0, verCode:0});

  const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: result.jwtExpiry});
  res.status(200).json({result, token});
  console.log (result);
  console.log('dpSet');
 } catch(error){
   console.log(error);
 }

 
}

export const getMiniProfile = async(req,res) => {

    const {profileName} = req.params;
    console.log(req.params);
    try{
  
    const miniProfile = await UsersModel.findOne ({userName: { $in: [ profileName ] } },  {userName:1, dpUrl:1, follows:1, followers:1, bio:1, postTotal:1, convoTip:1});
    
    if (!miniProfile){  

      res.json("NO_USER");

    } else {

      res.json(miniProfile);
      console.log(miniProfile);

    }

    } catch(error){
      console.log(error)
    }
 
}


export const follow =  async (req, res)=> {

  const {follower, followed} = req.body;
     
    try{
      const followerUser = await UsersModel.findById (follower);
      console.log(followerUser.follows);

      if (followerUser.follows.includes(followed)){
        
        const updatedFollower= await UsersModel.findByIdAndUpdate (follower, { $pull: { "follows": followed }}, { new: true });
        const updatedFollowed= await UsersModel.findByIdAndUpdate (followed, { $pull: { "followers": updatedFollower._id }}, { new: true });
        const miniProfile = await UsersModel.findById (updatedFollowed._id , {userName:1, dpUrl:1, follows:1, followers:1});
        res.json(miniProfile);
        console.log("followed");

    
    } else {

        const updatedFollower = await UsersModel.findByIdAndUpdate (follower, { $push: { "follows": followed }}, { new: true });
        const updatedFollowed= await UsersModel.findByIdAndUpdate (followed, { $push: { "followers": updatedFollower._id }}, { new: true });
        const miniProfile = await UsersModel.findById (updatedFollowed._id , {userName:1, dpUrl:1, follows:1, followers:1});
        res.json(miniProfile);
        console.log("unfollowed");
    }
  
  } catch(error){
      res.status(409).json({message:error.message});
  }

}
 
export const dailyPoints = async(req,res) => {
  const {id} = req.params;
  console.log(req.params);
 
  
  try{
    const userTime = await UsersModel.findById (id, {dailyLogin:1, activityPointsTotal:1});

    console.log(userTime);
    const addedTotalPoints = (userTime.activityPointsTotal + 10);
    const loginRecord = {type: "Daily Login Points", points: 10};

    if (Date.now() > (userTime.dailyLogin + 86400000)){
                                                                        
      const awarded_User_Profile = await UsersModel.findByIdAndUpdate (id,{ $push:{"activityRecord": loginRecord}, $set: {dailyLogin: Date.now(), activityPointsTotal: addedTotalPoints}}, { new: true });
      
      const result = await UsersModel.findById(awarded_User_Profile._id, {password:0, verCode:0});

      const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: result.jwtExpiry});
      res.status(200).json({result, token});
      console.log (result);
      console.log('daily Points Awarded');

    } else {
      res.json("Dont Manipulate Html Again");

    }
  } catch(error){
    console.log(error);
  }
 
  
 }