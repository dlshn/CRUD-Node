const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');

const signup = async (req, resp)=>{
    
    try{

        const existingUser = await UserSchema.findOne({email:req.body.email});
        if(existingUser){
            return resp.status(400).json({'message':'user already exist', error:e});
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const userSchema = new UserSchema({
            email:req.body.email,
            password:hashPassword,
            fullname:req.body.fullname
        });

        userSchema.save()
            .then(result=>resp.status(201).json({'message':'user saved!'}))
            .catch((error) => resp.status(500).json({'message':'something went wrong',error:error}));
    }catch(e){
        resp.status(500).json({'message':'something went wrong', error:e});

    }

}


module.exports = {
    signup, 
}