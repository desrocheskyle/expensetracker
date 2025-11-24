import React from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart
} from "recharts";

const CustomLineChart = ({ data }) => {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            
            const dataPoint = payload[0].payload;
            const totalAmount = dataPoint.amount;
            const details = dataPoint.categoryDetails;

            if (!details || details.length === 0) {
                 return null;
            }

            return (
                <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300">
                    <p className="text-sm font-bold text-purple-800 mb-2">
                        {label}
                    </p>
                    
                    <p className="text-md text-gray-700 mb-1">
                        Total:{" "}
                        <span className="text-md font-bold text-gray-900">
                            ${totalAmount.toFixed(2)}
                        </span>
                    </p>
                    
                    <p className="text-xs font-semibold text-gray-500 mt-2 border-t pt-1">
                        Breakdown:
                    </p>
                    {details.map((item, index) => (
                        <p key={index} className="text-xs text-gray-600 ml-2">
                            {item.category}:{" "}
                            <span className="font-medium">${item.amount.toFixed(2)}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="none" />

                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />

                    <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#875cf5"
                        strokeWidth={3}
                        fill="url(#lineGradient)"
                        dot={{ r: 3, fill: "#ab8df8" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;