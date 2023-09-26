const router=require("express").Router();
const UsersController=require("../controllers/usersController")
//add user
router.post("/AddUser",UsersController.addUser);
//get all user
router.get("/GetUser",UsersController.getAllUser);
//get an user
router.post("/GetAnUser",UsersController.getAnUser);
module.exports=router;