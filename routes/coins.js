const router=require("express").Router();
const coinsController=require("../controllers/coinsController")
//add coin
router.post("/AddCoin",coinsController.addCoin);

//get all coin
router.get("/GetCoin/:id",coinsController.getAllCoin);

//delete coin
router.delete("/DeleteCoin/:id",coinsController.deleteCoin);
module.exports=router;