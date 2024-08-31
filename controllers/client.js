import Product from "../Models/Product.js";
import  User from "../Models/User.js";
import Transaction from "../Models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";


export const getProducts = async (req, res) => {
    try {
        const productwithstats = await Product.aggregate([
            {
                $lookup: {
                    from: "productstats",
                    localField: "_id",
                    foreignField: "product",
                    as: "stats",
                }
            }
        ]);
        res.status(200).json(productwithstats);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
};

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({role: "user"}).select(_password) 
            
             res.status(200).json(customers);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try{
        const {sort , serach = ""} = req.query;

        const searchCriteria = {
            $or: [
                {cost : {$regex : new RegExp(serach, "i")}},
                { userId: {$regex : new RegExp (serach, "i")}},

            ],
        };
        const transactions = await Transaction.find(searchCriteria).sort(sort);
        res.status(200).json(transactions);    }
        catch (error) {
            res.status(500).json({ message: error.message });
        }

    };

    export const getGeography = async (req, res) => {
        try {
            const countryCounts = await User.aggregate([
                {
            $group: {
                _id: {country: "$country"},
                count: { $sum: 1 }

            },
        },
        {
            $project: {
                _id: 0,
                country: "$_id.country",
                count: 1
            },
        },

        ]);

        const formattedLocations = await Promise.all(
            countryCounts.map(async (item)=> ({
                id: await getCountryIso3(item.country),
                value : item.count,
            }))
        );
        res.status(200).json(formattedLocations);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


