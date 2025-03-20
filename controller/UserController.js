const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const wt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secret = process.env.JWT_SECRET || 'default_secret_key';

const signup = async (req, resp)=>{
    
    try{

        const existingUser = await UserSchema.findOne({email:req.body.email});
        if(existingUser){
            return resp.status(400).json({'message':'user already exist', error:e});
        }

        const transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            service:'gmail',
            port:process.env.EMAIL_PORT,
            secure:false,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const userSchema = new UserSchema({
            email:req.body.email,
            password:hashPassword,
            fullname:req.body.fullname
        });

        await userSchema.save();
        const mailOption={
            from:process.env.EMAIL_USER,
            to:req.body.email,
            subject:'Welcome to my app',
            text:'You have successfully signed up to my app'
        }
        transporter.sendMail(mailOption, (error, info)=>{
            if(error){
                console.log('error', error);
            }else{
                console.log('Email sent', info.response);
            }
        });

        resp.status(201).json({'message':'user saved!'});
            
    }catch(e){
        resp.status(500).json({'message':'something went wrong', error:e});

    }

}

const login = async (req, resp)=>{
    
    try{

        const existingUser = await UserSchema.findOne({email:req.body.email});
        if(!existingUser){
            return resp.status(404).json({'message':'user not found', error:e});
        }
        
        const isConfirm = await bcrypt.compare(req.body.password, existingUser.password);
        if(!isConfirm){
            return resp.status(401).json({'message':'invalid password'});
        }
        const token = wt.sign({userId:existingUser._id, email:existingUser.email, fullname:existingUser.fullname},
            secret,
            {expiresIn:'5h'});
        
        resp.status(200).json({'token':token, message:'user logged'});

        
    }catch(e){
        resp.status(500).json({'message':'something went wrong', error:e});

    }

}

module.exports = {
    signup, login
}