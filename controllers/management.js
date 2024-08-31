import User from "../Models/User.js";
import mongoose from "mongoose";
import Transaction from "../Models/Transaction.js";


export const getAdmins = async (req,res)=>{
    try {
        const admins = await User.findById({role: 'admin'});
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
};

export const getUserPerfomance = async (req,res) => {
    try {
        const {id} = req.params;
        const userWithStats = await User.aggregate([
            {$match : {_id: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: 'affiliatestats',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'affiliateStats'
                },
            },
            {
                $unwind : "$affiliateStats"},

            
        ]);
        const saleTransaction = await Promise.all(
            userWithStats[0].affiliates.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
        );
        const filteredSaleTransactions = saleTransaction.filter(
            (transaction) => transaction !== null
        );
        res.status(200).json({user: userWithStats[0],sales: filteredSaleTransactions});
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
};