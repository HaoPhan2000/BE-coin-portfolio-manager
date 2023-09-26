const router=require("express").Router();
const favoritesController=require("../controllers/favoritesContoller")
//add favorite
router.post("/AddFavorite",favoritesController.addFavorite);

//get favorite
router.get("/GetFavorite/:id",favoritesController.getFavorite)
//delete favorite
router.delete("/DeleteFavorite/:id",favoritesController.deleteFavorite)
module.exports=router;