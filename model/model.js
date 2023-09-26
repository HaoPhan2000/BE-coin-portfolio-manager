const mongoose =require("mongoose");

const usersSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    passWord:{
        type:String,
        require:true
    },
    dateCreated:{
        type:String,
        require:true
    },
    coins:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Coins"
        }
    ],
    favorites:[
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Favorites"
        } 
    ]
});

const coinsSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    id:{
        type:String,
        require:true
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Users",
       require:true
    },
    transactions:[
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transactions"
        }
    ]
});

const favoritesSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    id:{
        type:String,
        require:true
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Users" 
    },
});

const transactionsSchema =new mongoose.Schema({
    price:{
        type:String,
        require:true
    },
    total:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    coin:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Coins" 
    },
});

let Users =mongoose.model("Users",usersSchema);
let Coins =mongoose.model("Coins",coinsSchema);
let Favorites =mongoose.model("Favorites",favoritesSchema);
let Transactions =mongoose.model("Transactions",transactionsSchema);

module.exports={Users,Coins,Favorites,Transactions};
 