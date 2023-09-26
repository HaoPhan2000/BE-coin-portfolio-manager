const router=require("express").Router();
const TransactionsController=require("../controllers/transactionsController")
//add transaction
router.post("/AddTransactionByCoin",TransactionsController.addTransactionByCoin);
//add transaction
router.post("/AddTransactionAndAddCoin",TransactionsController.addTransactionAndAddCoin);
//get all transaction
router.get("/GetTransaction/:id",TransactionsController.getAllTransaction);
//put transaction
router.put("/PutTransaction/:id",TransactionsController.putTransaction)
//delete transaction
router.delete("/DeleteTransaction/:id",TransactionsController.deleteTransaction)

module.exports=router;