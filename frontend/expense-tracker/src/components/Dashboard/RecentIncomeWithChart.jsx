import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

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

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
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
                <h5 className="text-lg">Last 30 Days Income</h5>
            </div>

            <CustomPieChart data={chartData} label="Total Income" totalAmount={`$${totalIncome}`} showTextAnchor colors={COLORS}/>
        </div>
    );
};

export default RecentIncomeWithChart;