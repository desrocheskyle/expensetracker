import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

export const getInitials = (name) => {
    if (!name) return "";
  
    const words = name.split(" ");
    let initials = "";
  
    // Take the first letter of the first two words
    for (let i = 0; i < Math.min(2, words.length); i++) {
      if (words[i].length > 0) {
        initials += words[i][0].toUpperCase();
      }
    }
  
    return initials;
  };

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    // Convert number to string and split into integer and fractional parts
    const [integerPart, fractionalPart] = num.toString().split(".");

    // Add commas to the integer part using regex
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine integer and fractional parts (if any)
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
  };

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

/*
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => {
    const dateOnly = item.date.split("T")[0];
    return {
      month: moment(dateOnly).format('Do MMM'),
      amount: item.amount,
      source: item.source,
    };
  });

  return chartData;
};
*/

export const prepareIncomeBarChartData = (data = []) => {
  // 1. Aggregate income by date, collecting amounts and source details
  const aggregatedDataMap = data.reduce((acc, item) => {
    const dateOnly = item.date.split("T")[0]; // Key: 'YYYY-MM-DD'
    const formattedDate = moment(dateOnly).format('Do MMM');

    // Ensure amount is a number for aggregation
    const amount = Number(item?.amount) || 0; 

    if (!acc[dateOnly]) {
      // Initialize the entry for the new date
      acc[dateOnly] = {
        month: formattedDate,
        amount: 0, // This will be the running total for the bar height
        sourceDetails: [], // Array to hold all individual transaction details (source and amount)
        dateKey: dateOnly,
      };
    }
    
    // Add the amount to the running total for this date
    acc[dateOnly].amount += amount;

    // Store the individual entry details
    acc[dateOnly].sourceDetails.push({
        amount: amount,
        source: item?.source,
    });

    return acc;
  }, {});

  // 2. Convert the aggregated object back into a sorted array
  const chartDataArray = Object.values(aggregatedDataMap);

  // 3. Sort the array by date
  chartDataArray.sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey));

  // 4. Map to the final structure for the bar chart
  const finalChartData = chartDataArray.map(item => ({
    month: item.month, 
    amount: item.amount, // Bar height: Total income for the day
    sourceDetails: item.sourceDetails // Tooltip breakdown
  }));

  return finalChartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const aggregatedDataMap = data.reduce((acc, item) => {
    const dateOnly = item.date.split("T")[0];
    const formattedDate = moment(dateOnly).format('Do MMM');

    const amount = Number(item?.amount) || 0; 

    if (!acc[dateOnly]) {
      acc[dateOnly] = {
        month: formattedDate,
        amount: 0, 
        categoryDetails: [], 
        dateKey: dateOnly,
      };
    }
    
    acc[dateOnly].amount += amount;

    acc[dateOnly].categoryDetails.push({
        amount: amount,
        category: item?.category,
    });

    return acc;
  }, {});

  const chartDataArray = Object.values(aggregatedDataMap);

  chartDataArray.sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey));
  
  const finalChartData = chartDataArray.map(item => ({
    month: item.month, 
    amount: item.amount,
    categoryDetails: item.categoryDetails 
  }));

  return finalChartData;
};