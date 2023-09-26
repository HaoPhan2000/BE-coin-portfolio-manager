const{Users,Coins,Favorites,Transactions}=require("../model/model");

const favoritesController={
    //add favorite
    addFavorite:async(req,res)=>{
       try{
        const newFavorite=new Favorites(req.body);
        const savedFavorite=await newFavorite.save();
        if(req.body.user)
        {
            const user=Users.findById(req.body.user)
            await user.updateOne({$push:{favorites:savedFavorite._id}})
        }
        res.status(200).json("Add successfully")
       }
       catch(err){
        res.status(500).json(err);
       }
    },
    //get favorite
    getFavorite:async(req,res)=>{
        try{
            const favorite=await Favorites.find({user:req.params.id})
            res.status(200).json(favorite);
        }
        catch(err){
         res.status(500).json(err);
        }
     },
    //delete favorite 
    deleteFavorite:async(req,res)=>{
        try{
            await Users.updateMany(
                {favorites:req.params.id},
                {$pull:{favorites:req.params.id}}
            )
          await Favorites.findByIdAndDelete(req.params.id);
          res.status(200).json("Deleted successfully")
        }
        catch(err){
         res.status(500).json(err);
        }
     },
}
module.exports=favoritesController;