const { Users, Coins, Favorites, Transactions } = require("../model/model");

const transactionsController = {
    //add transaction
    addTransactionByCoin: async (req, res) => {
        try {
            const newTransaction = new Transactions(req.body);
            const savedTransaction = await newTransaction.save();
            const coin = Coins.findById(req.body.coin)
            await coin.updateOne({ $push: { transactions: savedTransaction._id } })

            res.status(200).json("Add Transaction successfully")
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //add transaction and add coin
    addTransactionAndAddCoin: async (req, res) => {
        try {
            const coined = await Coins.findOne({ user: req.body.user, id: req.body.id })
            if (coined) {
               
                const newTransaction = new Transactions({
                    price: req.body.price,
                    total: req.body.total,
                    time: req.body.time,
                    type: req.body.type,
                    coin:  coined._id

                });
                const savedTransaction = await newTransaction.save();
                await coined.updateOne({ $push: { transactions: savedTransaction._id } })
                res.status(200).json("Coin đã tồn tại,đã thêm transaction thành công")
            }
            else {
                //add coin
                const newCoin = new Coins(
                    {
                        name: req.body.name,
                        id: req.body.id,
                        user: req.body.user
                    }
                );
                const savedCoin = await newCoin.save();
                const user = Users.findById(req.body.user)
                await user.updateOne({ $push: { coins: savedCoin._id } })
                //add transaction
                const newTransaction = new Transactions({
                    price: req.body.price,
                    total: req.body.total,
                    time: req.body.time,
                    type: req.body.type,
                    coin: savedCoin._id,
                });
                const savedTransaction = await newTransaction.save();
                const coin = Coins.findById(savedCoin._id)
                await coin.updateOne({ $push: { transactions: savedTransaction._id } })
                res.status(200).json("Add Transaction and add Coin successfully")
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //get transaction
    getAllTransaction: async (req, res) => {
        try {
            const transaction = await Transactions.find({ coin: req.params.id })
            res.status(200).json(transaction);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //put transaction
    putTransaction: async (req, res) => {
        try {
            const transaction = await Transactions.findById(req.params.id)
            await transaction.updateOne({ $set: req.body })
            res.status(200).json("Updated successfully")
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //delete transaction
    deleteTransaction: async (req, res) => {
        //truyền vào id transaction
        try {
            //1dùng để lấy id coin của transaction
            const coinCheck = await Coins.findOne({ transactions: req.params.id })
            //2 xóa transaction này đi
            await Transactions.findByIdAndDelete(req.params.id);
            //3 up date lại transaction trong coin
            await Coins.updateOne(
                { transactions: req.params.id },
                { $pull: { transactions: req.params.id } },
            )
            //4 lấy tra coin trong list có cái id giống với id coin lúc đầu  
            const coin = await Coins.findOne({ _id: coinCheck._id })
            //5 kiểm tra xem thuộc tính transaction trong coin có rỗng ko
            if (coin.transactions.length == 0) {
                //6 up date lại coin trong user
                await Users.updateOne(
                    { coins: coin._id },
                    { $pull: { coins: coin._id } },
                )
                //7 xóa coin đi    
                await Coins.deleteOne({ _id: coin._id })
            }
            res.status(200).json("Deleted successfully")
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
}
module.exports = transactionsController;