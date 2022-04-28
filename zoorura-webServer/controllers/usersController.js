import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//import { uuid } from 'uuidv4';
import { v4 as uuid_v4 } from "uuid";

//import {createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebaseBack/config.js";
import {sendVerifyEmail, sendSecurityEmail, sendDeleteAccountEmail} from './emailControllers.js'


import {UsersModel} from '../models/usersModel.js';
import {DiariesModel} from '../models/diariesModel.js';
import {ConvosModel} from '../models/convosModel.js';
import {TipsModel} from '../models/tipsModel.js';
import {MessagesModel} from '../models/messagesModel.js';
import {ReviewsModel} from '../models/reviewsModel.js';
import {NotificationsModel} from '../models/notificationsModel.js';

//Search Area: follow getUsers


import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;






const filterItemOut = (key, { [key]: deletedKey, ...others }) => others;



function getCodec() {
   // return Math.floor(Math.random() * 969696);
    return Math.floor(Math.random()*1e9).toString(32);
   };


  // CONTROLLERS==================================

  export const deleteAccount = async (req,res) => {

    const id = req.userId;
    const {password} = req.body;

    console.log(id);
    console.log(password);
 
  
      try{ 
        const thisUser = await UsersModel.findById(id);
        const passwordSame = await bcrypt.compare(password, thisUser.password);
        
        console.log(thisUser);
         console.log(passwordSame);

        if(!passwordSame) {

          res.json({message:'WrongPassword'});

        }else if(passwordSame && thisUser){

          const uniqueStr = getCodec ();      
          const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
          const hashedPassword = await bcrypt.hash (password, 12);
          const editedUser = await UsersModel.findByIdAndUpdate(thisUser._id, {$set:{ "profileVerified": false, "verCode":uniqueStrEncrypted, "verTime":Date.now(), "verExpiry":Date.now() + 172800000 }}, { new: true });
            
           
          await sendDeleteAccountEmail (editedUser.email, uniqueStr, editedUser.userName, editedUser._id);  
           res.json({message:'Success'});

        }else { 
          res.json({message:'error'});
        }
          
    
      } catch (error){
          res.json({message: 'error'});
      }
  }

  export const sendOtp = async (req,res) => {
    const id = req.userId;
    console.log('userId :' + id);
  
      try{ 
      
          const user = await UsersModel.findById(id);
          console.log(user);
          const {email} = user;
          const userName = user.userName.toLowerCase();
  
            const uniqueStr = getCodec ();
            
            console.log(uniqueStr);
        
            const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
          
    
            const otpPatchedUser = await UsersModel.findByIdAndUpdate(id, {$set: {verCode: uniqueStrEncrypted}}, { new: true });
            console.log(otpPatchedUser);
            const emailSent = sendVerifyEmail (email,uniqueStr, userName);
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

  export const getUsers = async (req,res) => {

   
    console.log(req.body);
    console.log('getUsers')
    const {type} = req.body;
    console.log(type);
    
      try{ 

        if(type === 'ChatHunt'){

          const users = await UsersModel.find({},{_id:1, dpUrl:1, userName:1, blockers:1, blocked:1, convoTip:1}).limit(40);
          console.log(users);
          res.json({users: users, message:'ChatHunt'});

        }else if(type === 'Following'){

          const {userId} = req.body;
 
          const users = await UsersModel.findById(userId, {follows:1, blockers:1, blocked:1, convoTip:1})
          .populate('follows', 'dpUrl userName');

          res.json({users: users, message:'Following'});

        }else if(type === 'Following'){

          const {userId} = req.body;
 
          const users = await UsersModel.findById(userId, {followers:1, blockers:1, blocked:1, convoTip:1})
          .populate('followers', 'dpUrl userName');

          res.json({users: users, message:'Followers'});

        }
      
      } catch (error){
          res.status(404).json({message: 'Something went wrong'});
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
    //const {username} = req.params;
    const username = req.params.username.toLowerCase();
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

export const editProfile = async (req,res) => {
  console.log(req.body);
  const {bio, convoTip} = req.body;
  const userName = req.body.userName.toLowerCase();
  const thisUser = await UsersModel.findById(req.userId);
  const existingUser = await UsersModel.findOne ({userName: { $in: [ userName ] } });;

    try{ 
      
      if(existingUser && thisUser.userName !== userName){

        return res.json({message:"UsernameTaken"});

      }else if ((!existingUser || (existingUser && thisUser.userName === userName))
        && userName.length > 1 && userName.length < 31 && /^\d*[a-zA-Z][a-zA-Z\d]*$/.test(userName) == true
        && bio.length > 0 && bio.length < 100
        && convoTip >=0 && convoTip <151)
      {
      const editedUser_Detailed = await UsersModel.findByIdAndUpdate(req.userId, {$set:{"userName":userName, "bio":bio, "convoTip":convoTip}}, { new: true });

      const editedUser = await UsersModel.findById(editedUser_Detailed._id, {password:0, verCode:0});
     
      const token = jwt.sign({email: editedUser.email, id: editedUser._id}, JWT_SECRET, {expiresIn: editedUser.jwtExpiry});
        res.status(200).json({result:editedUser, token, message:'editedProfile'}); // check jwt
        console.log('editedProfile');
      }else{
        return res.json({message:"error"})
      }
    } catch (error){
      console.log(error.message);
      return res.json({message:"error"});
    }

  }

  export const editSecurity = async (req,res) => {

    const {email, password, currentPassword} = req.body;
    const remail = email;

    const thisUser = await UsersModel.findById (req.userId);
    const existingEmail = await UsersModel.findOne ({email: { $in: [ email ] } });
    const passwordCorrect = await bcrypt.compare(currentPassword, thisUser.password);
 
      const passwordSame = await bcrypt.compare(password, thisUser.password);
 
   

    try{
      if(!passwordCorrect){
        return res.json({message:"WrongPassword"});
      }

      if(existingEmail && remail !== thisUser.email && passwordCorrect){
        return res.json({message:"EmailTaken"});
      }
      
      if(password.length > 0 
        && passwordSame
        && passwordCorrect
        ){
        return res.json({message:"PasswordSame"});
      }
      //If password Present
    if ((!existingEmail || (existingEmail && remail === thisUser.email)) 
        && email.length > 4 && email.length < 41 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == true
        && password.length > 4 && password.length < 24 && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/.test(password) == true
          && !passwordSame
          && passwordCorrect){

          const uniqueStr = getCodec ();      
          console.log(uniqueStr);
          const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
          const hashedPassword = await bcrypt.hash (password, 12);
          const editedUser_Detailed = await UsersModel.findByIdAndUpdate(req.userId, {$set:{"tempEmail":email, "tempPassword":hashedPassword, "profileVerified": false, "verCode":uniqueStrEncrypted, "verTime":Date.now(), "verExpiry":Date.now() + 172800000 }}, { new: true });
          
          if (editedUser_Detailed.email === remail){ //if same emails PASS EDIT
             
            const change = 'Password'
            sendSecurityEmail (remail,uniqueStr, editedUser_Detailed.userName, editedUser_Detailed._id, change);  
            return res.json({message:"PasswordEdited", remail:remail});
          } else if (editedUser_Detailed.email !==remail){ //if a different email and added pass EMAIL AND PASS
            
            const change = 'Email and Password'
            sendSecurityEmail (remail,uniqueStr, editedUser_Detailed.userName, editedUser_Detailed._id, change);  
            return res.json({message:"EmailPasswordEdited", remail:remail});
          }
          
         //If changepassword empty  EMAIL EDIT     
      } else if (!existingEmail && email.length > 4 && email.length < 41 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == true
               && password.length === 0){ 
        
              const uniqueStr = getCodec ();      
              console.log(uniqueStr);
              const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
              const editedUser_Detailed = await UsersModel.findByIdAndUpdate(req.userId, {$set:{"tempEmail":email, "verCode":uniqueStrEncrypted, "profileVerified": false, "verTime":Date.now(), "verExpiry":Date.now() + 172800000 }}, { new: true });
              const change = 'Email'
              sendSecurityEmail (remail,uniqueStr, editedUser_Detailed.userName, editedUser_Detailed._id, change); //add verified true after clicking verify link.
              
              return res.json({message:"EmailEdited", remail:remail});

      } else {
        console.log(error.message);
        return res.json({message:"error"});
      }  


      
  
    } catch (error){
      return res.json({message:"error"});
    }

  }


  export const forgotPassword = async (req,res) => {

      try{
          const {email, password} = req.body;
          const remail = email;

          
          const thisUser = await UsersModel.findOne ({email: { $in: [ email ] } });
        
      
        
            if(!thisUser){

              return res.json({message:"NoEmail"});
              
            }
            else if(thisUser){

                const passwordSame = await bcrypt.compare(password, thisUser.password);

                if(thisUser &&  passwordSame){
                  return res.json({message:"PasswordSame"});
                }else if (thisUser && !passwordSame  //no need to validate email if its in db
                  && password.length > 4 && password.length < 24 && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/.test(password) == true
                  ){

                    const uniqueStr = getCodec ();      
                    const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
                    const hashedPassword = await bcrypt.hash (password, 12);
                    const editedUser = await UsersModel.findByIdAndUpdate(thisUser._id, {$set:{"tempEmail":email, "tempPassword":hashedPassword, "profileVerified": false, "verCode":uniqueStrEncrypted, "verTime":Date.now(), "verExpiry":Date.now() + 172800000 }}, { new: true });
                      
                      const change = 'Password'
                      sendSecurityEmail (remail,uniqueStr, editedUser.userName, editedUser._id, change);  
                      return res.json({message:"Success", remail:remail});
              
                } else {
                  console.log(error.message);
                  return res.json({message:"error"});
                } 

          }   
    
      } catch (error){

        return res.json({message:"error"});
        
      }

  }


export const login = async (req,res) => {
 const {email, password, autologout} = req.body;
 console.log(req.body);
 
 try{ 
  
     const existingEmail = await UsersModel.findOne({email: { $in: [ email ] } });
     const passwordCorrect = await bcrypt.compare(password, existingEmail.password);

     if(!existingEmail || !passwordCorrect) return res.json({message:"LoginError"});
    
    
    if (existingEmail &&  passwordCorrect){

      const loggedUser_Detailed = await UsersModel.findByIdAndUpdate(existingEmail._id, {jwtExpiry: autologout}, { new: true });
      const loggedUser = await UsersModel.findById(loggedUser_Detailed._id, {password:0, verCode:0});
      console.log(loggedUser);
      const token = jwt.sign({email: loggedUser.email, id: loggedUser._id}, JWT_SECRET, {expiresIn: autologout});
   
      res. status(200).json({result:loggedUser, token, message:'RegistrySuccess'});

    }
     

 } catch (error){
     res.json({message: 'UnknownError'});
     console.log(error.message);
 }
}
export const register = async (req,res) => {
    
    const {password, confirmPassword} = req.body;
    const userName = req.body.userName.toLowerCase();
    const email = req.body.email.toLowerCase();
    try {
        const existingUser = await UsersModel.findOne ({userName: { $in: [ userName ] } });
        const existingEmail = await UsersModel.findOne ({email: { $in: [ email ] } });


         if(existingUser && !existingEmail){
 
            return res.json({message:"UsernameTaken"});

          } else if (existingEmail && !existingUser) {

            return res.json({message:"EmailTaken"});

          }else if (existingEmail && existingUser) { 

            return res.json({message:"UsernameEmailTaken"});
  
          }else if(!existingEmail && !existingUser 
            // &la.length > 1 &la.length < 16 && /^[aA-zZ]+$/.tesla) == true
            // && lastName.length > 1 && lastName.length < 16 && /^[aA-zZ]+$/.test(lastName) == true
            && userName.length > 1 && userName.length < 31 && /^\d*[a-zA-Z][a-zA-Z\d]*$/.test(userName) == true
            && email.length > 2 && email.length < 41 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == true
            && password.length > 4 && password.length < 24 && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/.test(password) == true
            && confirmPassword === password   
            ){  
             
              const hashedPassword = await bcrypt.hash (password, 12);
              const uniqueStr = getCodec ();
              console.log(uniqueStr);
              const uniqueStrEncrypted = await bcrypt.hash (uniqueStr, 12);
              
              const resultX = await UsersModel.create({email, userName, password: hashedPassword, convoTip:5, verCode: uniqueStrEncrypted, verTime: Date.now(), verExpiry: Date.now() + 172800000});
              const result = await UsersModel.findById(resultX._id, {password:0, verCode:0});
                
              console.log(result);
              

                if (result) {
                    const remail = result.email;
                    sendVerifyEmail (remail,uniqueStr, userName);    
                    const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "12h"});
                    res.status(200).json({result, token, message:'RegistrySuccess'});
                }

            }else{
              return res.json({message:"InputError"});
            }

        

    } catch (error) { 
      res.json({message: 'UnknownError'}); 
      console.log(error.message);
    }
  
}

export const verify = async(req,res) => {
    const {otp, userId, type} = req.body
      
  
        if (type === 'delete'){ 
                
                
              try{
                  
                  console.log(userId);
                  console.log(req.body);
                  const user = await UsersModel.findById (userId);
                  if (!user){
  
                          res.json({message: 'NoUser'});

                  }else{
                            console.log(user);
                            const id = user._id;
                            const codeMatch = await bcrypt.compare(otp,user.verCode);
                            console.log(codeMatch);
                            console.log('delete')
                          if (codeMatch && user.verExpiry > Date.now () && user.profileVerified == false){
                                  try {
                                  
                                      await UsersModel.findByIdAndRemove(id);
                                      await DiariesModel.deleteMany({'creator': id});
                                      await ConvosModel.deleteMany({'host': id});
                                      await ConvosModel.deleteMany({'guest': id});
                                      await MessagesModel.deleteMany({'senderId': id}); 
                                      // await MessagesModel.deleteMany({'receiverId': id});
                                      await NotificationsModel.deleteMany({'sender': id});
                                      //await NotificationsModel.rdeleteMany({'receiver': id});
                                      await TipsModel.deleteMany({'tipperId': id});
                                      await ReviewsModel.deleteMany({'reviewerId': id});

                                      res.json({message:'DeleteSuccess'});
                                      console.log('Delete Success');
                                      
                                    }
                                    catch(error){
                                        console.log(error.message);
                                    }

                            }  else if (!codeMatch && user.verExpiry > Date.now() && user.profileVerified == false){
                                     res.json({message: "OtpError"});
                            } else if (user.verExpiry < Date.now() && user.profileVerified == false){

                                console.log ("expired");
                                res.json({message: "RegisterOtpExpired"});

                            } else{
                              res.json({message: "UnknownError"});
                            }             
                  }

              } catch(error){
                      console.log(error.message);
              }
          }else if (type === 'typed'){ 
                  const id = userId;
                  console.log(id);
                
                  const user = await UsersModel.findById (id);
                  console.log(user);
                  const codeMatch = await bcrypt.compare(otp,user.verCode);
                  console.log(codeMatch);

                  if (user.verified == true){
                    try {
      
                    
                    res.json({message: 'AlreadyVerified'});
                    
                    console.log('already verified');
                    
                    }
                    catch(error){
                        console.log(error.message);
                    }
      
                  } else if (codeMatch && user.verExpiry > Date.now () && user.verified == false){
                      try {
                      const verifiedUser = await UsersModel.findByIdAndUpdate (id, {verified: true, dailyLogin: Date.now()}, { new: true });
                      

                      const result = await UsersModel.findById(verifiedUser._id, {password:0, verCode:0});

                      const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "12h"});
                      res.status(200).json({result, token, message:'RegistrySuccess'});
                      console.log (result);
                      console.log('verified');
                      }
                      catch(error){
                          console.log(error.message);
                      }

                  }  else if (!codeMatch && user.verExpiry > Date.now() && user.verified == false){
                    res.json({message: "OtpError"});
                  }else if (user.verExpiry < Date.now() && user.verified == false){

                      console.log ("expired");
                      await UsersModel.findByIdAndRemove(id);
                      res.json({message: "RegisterOtpExpired"});

                  }else{
                    res.json({message: "UnknownError"});
                  }
          }else if (type === 'linked'){ 
            
            const id = userId;
            console.log(id);
          
            const user = await UsersModel.findById (id);
        
            const codeMatch = await bcrypt.compare(otp,user.verCode);
            console.log(codeMatch);
            
            if (user.profileVerified == true){
              try {

              
              res.json({message: 'AlreadyVerified'});
              
              console.log('linked already verified');
              
              }
              catch(error){
                  console.log(error.message);
              }

            } else if (codeMatch && user.verExpiry > Date.now () && user.profileVerified == false){
                try {

                const verifiedUser = await UsersModel.findByIdAndUpdate (id, {profileVerified:true, verified:true, password: user.tempPassword, email: user.tempEmail}, { new: true });
                const result = await UsersModel.findById(verifiedUser._id, {password:0, verCode:0});
                const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "12h"});
                res.status(200).json({result, token, message:'SecuritySuccess'});
                console.log (result);
                console.log('verified');

                }
                catch(error){
                    console.log(error.message);
                }

            }  else if (!codeMatch && user.verExpiry > Date.now() && user.profileVerified == false){

              res.json({message: "OtpError"});

            }else if (codeMatch && user.verExpiry < Date.now () && user.profileVerified == false){

                console.log ("expired");
                await UsersModel.findByIdAndRemove(id);
                res.json({message: "ChangeOtpExpired"});

            }else{
              res.json({message: "UnknownError"});
            }
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

export const block = async(req,res) => {
    
    const {blocked} = req.body;
    console.log(req.body);
 
  try{

   const blockedUser = await UsersModel.findByIdAndUpdate (blocked, { $push: { "blockers": req.userId }}, { new: true });
   
   console.log(blockedUser.blockers);
   
   const blockerUser = await UsersModel.findByIdAndUpdate (req.userId, { $push: { "blocked": blocked }}, { new: true });
   
   console.log(blockerUser.blocked);

   const result = await UsersModel.findById(blockerUser._id, {password:0, verCode:0});
 
    const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: result.jwtExpiry});
    res.status(200).json({result, token, message:'Success'});
   
    console.log('Success');

  } catch(error){

      console.log(error.message);
      res.json({message:'error'})

  }
 
  
 }
 export const unblock = async(req,res) => {
    
  const {unblocked} = req.body;
  console.log(req.body);

try{

    const unblockedUser = await UsersModel.findByIdAndUpdate (unblocked, { $pull: { "blockers": req.userId }}, { new: true });
    
    console.log(unblockedUser.blockers);
    
    const unblockerUser = await UsersModel.findByIdAndUpdate (req.userId, { $pull: { "blocked": unblocked }}, { new: true });
    
    console.log(unblockerUser.blocked);

    const result = await UsersModel.findById(unblockerUser._id, {password:0, verCode:0});

      const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: result.jwtExpiry});
      res.status(200).json({result, token, message:'Success'});
    
      console.log('Success');

  } catch(error){

      console.log(error.message);
      res.json({message:'error'})

  }
}

export const populateBlock = async(req,res) => {


    try{

    const blockedUsers = await UsersModel.findById(req.userId, {blocked:1})
    .populate('blocked', 'dpUrl userName');

    res.status(200).json(blockedUsers);
    console.log(blockedUsers);

    } catch(error){

        console.log(error.message);

    }

}

export const getMiniProfile = async(req,res) => {

   
    const profileName = req.params.profileName.toLowerCase();
    console.log(req.params);
    
    try{
  
    const miniProfile = await UsersModel.findOne ({userName: { $in: [ profileName ] } },  {userName:1, dpUrl:1, follows:1, followers:1, blockers:1, blocked:1, bio:1, postTotal:1, convoTip:1, convoRequesters:1});
    
    if (!miniProfile || miniProfile.blocked.includes(req.userId) || miniProfile.blockers.includes(req.userId)){  

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

  const { followed} = req.body;
  
      
    try{

      const user = await UsersModel.findById(req.userId);
      const  newFollowSpam = user.followSpam + 1;
      
      if(newFollowSpam > 100){

          res.json('Spam');

      }else{
          const followerUser = await UsersModel.findById (req.userId);
          console.log(followerUser.follows);

          if (followerUser.follows.includes(followed)){
            
            const updatedFollower= await UsersModel.findByIdAndUpdate (req.userId, { $pull: { "follows": followed }}, { new: true });
            const updatedFollowed= await UsersModel.findByIdAndUpdate (followed, { $pull: { "followers": updatedFollower._id }}, { new: true });
            const miniProfile = await UsersModel.findById (updatedFollowed._id , {userName:1, dpUrl:1, follows:1, followers:1, blockers:1, blocked:1, bio:1, postTotal:1, convoTip:1, convoRequesters:1});
            res.json({miniProfile}); 
            const updatedUser = await UsersModel.findByIdAndUpdate(req.userId, { $set: {followSpam:newFollowSpam}}, { new: true });
            console.log(updatedUser); 
            console.log('unfollowed')
 
        
        } else {

            const updatedFollower = await UsersModel.findByIdAndUpdate (req.userId, { $push: { "follows": followed }}, { new: true });
            const updatedFollowed= await UsersModel.findByIdAndUpdate (followed, { $push: { "followers": updatedFollower._id }}, { new: true });
            const miniProfile = await UsersModel.findById (updatedFollowed._id , {userName:1, dpUrl:1, follows:1, followers:1, blockers:1, blocked:1, bio:1, postTotal:1, convoTip:1, convoRequesters:1});
            
            const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:followed, body:'', postId:followed, read: false, class:'normal',  type: 'follow', createdOn: new Date(), dateRank: Date.now()});
            const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
            .populate('sender', 'dpUrl userName');
            
            
            res.json({miniProfile:miniProfile, newNotification:newNotification});
            const updatedUser = await UsersModel.findByIdAndUpdate(req.userId, { $set: {followSpam:newFollowSpam}}, { new: true });
            console.log(updatedUser);
            console.log("followed");
        }
    }
  
  } catch(error){
      res.status(409).json({message:error.message});
      console.log(error.message);
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
                                                                        
      const awarded_User_Profile = await UsersModel.findByIdAndUpdate (id,{ $push:{"activityRecord": loginRecord}, $set: {followSpam:0, postSpam:0, reviewSpam:0, dailyLogin: Date.now(), activityPointsTotal: addedTotalPoints}}, { new: true });
      
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