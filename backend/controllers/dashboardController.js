const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = new Types.ObjectId(req.user.id);

        // --- Total Income ---
        const totalIncome = await Income.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // --- Total Expense ---
        const totalExpense = await Expense.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // --- Last 30 Days Income ---
        const last30DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const incomeLast30Days = last30DaysIncomeTransactions.reduce(
            (sum, t) => sum + t.amount,
            0
        );

        // --- Last 30 Days Expense ---
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, t) => sum + t.amount,
            0
        );

        // --- Last 5 Income + Last 5 Expense ---
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => b.date - a.date);

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last30DaysIncome: {
                total: incomeLast30Days,
                transactions: last30DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};