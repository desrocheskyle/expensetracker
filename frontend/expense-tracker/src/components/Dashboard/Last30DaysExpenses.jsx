/*
import moment from "moment";
import React, { useState, useEffect } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import AlternativeCustomBarChart from "../Charts/AlternativeCustomBarChart";


const Last30DaysExpenses = ({ data }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => {};
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <AlternativeCustomBarChart data={chartData} xKey={"category"}/>
        </div>
    );
};

export default Last30DaysExpenses;
*/



import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import moment from "moment";

const COLORS = [
    "#F44336", // red
    "#E91E63", // pink
    "#9C27B0", // purple
    "#673AB7", // deep purple
    "#3F51B5", // indigo
    "#2196F3", // blue
    "#03A9F4", // light blue
    "#00BCD4", // cyan
    "#009688", // teal
    "#4CAF50", // green
    "#8BC34A", // light green
    "#CDDC39", // lime
    "#FFC107", // amber
    "#FF9800", // orange
    "#FF5722", // deep orange
  ];

const Last30DaysExpenses = ({ data, totalExpense }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.category,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    }

    useEffect(() => {
        prepareChartData();

        return () => {};
    }, [data]);


    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomPieChart data={chartData} label="Total Expense" totalAmount={`$${totalExpense}`} showTextAnchor colors={COLORS}/>
        </div>
    );
};

export default Last30DaysExpenses;