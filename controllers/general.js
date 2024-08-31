import User from "../Models/User.js";
import OverallStaat from "../Models/OverallStaat.js";
import Transaction from "../Models/Transaction.js";


export const getUser = async (req, res) => {
    try{ 
        const {id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

export const getDashboardStats = async (req,res) => {
    try {
        const currentMonth = "Augest";
        const currentYear = 2024;
        const currentDay = "2024-08-25"
        const transactions = await Transaction.find().sort({ createdOn: -1 });

        const OverallStaat = await Transaction.find({ year: currentYear});

        const  {
            totalCustomers,
            yearTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
        } = OverallStaat[0];

        const todayStats = OverallStaat[0].dailyData.find(({data }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            todayStats,
            transactions,
            currentMonth,
            currentYear,
            currentDay,
        });

       
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }

};





