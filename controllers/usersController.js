const{Users,Coins,Favorites,Transactions}=require("../model/model");

const UsersController={
    // add user
    addUser:async(req,res)=>{
       try{
        const checkEmail=await Users.findOne({email:req.body.email})
        if(checkEmail)
        {
            res.status(200).json("Account already exists")
        }
        else
        {
            const newUser=new Users(req.body)
            await newUser.save()
            res.status(200).json("Add user successfully")
        }
       }
       catch(err){
        res.status(500).json(err);
       }
    },
    // get all user
    getAllUser:async(req,res)=>{
        try{
            const users=await Users.find()

            res.status(200).json(users);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
     // get an user
     getAnUser:async(req,res)=>{
        try{
            const user=await Users.findOne({email:req.body.email,passWord:req.body.passWord})
            if(user){
                res.status(200).json(user._id)
            }
            else
            {
                res.status(200).json("login failed");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=UsersController;