const{Users,Coins,Favorites,Transactions}=require("../model/model");

const coinsController={
    // add Coin
    addCoin:async(req,res)=>{
       try{
        const newCoin=new Coins(req.body);
        const savedCoin=await newCoin.save();
        //thêm id Coin vào User
        const user=Users.findById(req.body.user)
        await user.updateOne({$push:{coins:savedCoin._id}})
           
        res.status(200).json("Add coin successfully")
       }
       catch(err){
        res.status(500).json(err);
       }
    },
    // get all Coin
      getAllCoin:async(req,res)=>{
        try{
            const coins=await Coins.find({user:req.params.id}).populate("transactions")
            res.status(200).json(coins);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    // delete coin
     deleteCoin:async(req,res)=>{ 
        try{
            await Users.updateOne(
                {coins:req.params.id},
                {$pull:{coins:req.params.id}},
            )
            await Coins.findByIdAndDelete(req.params.id);
            await Transactions.deleteMany({coin:req.params.id})
          res.status(200).json("Delete coin successfully")
        }
        catch(err){
         res.status(500).json(err);
        }
     },
}
module.exports=coinsController;