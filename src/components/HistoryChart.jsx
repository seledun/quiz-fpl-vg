import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const HistoryChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length === 0) {
            let history = localStorage.getItem("history");
            if (history !== null && history.length > 0) {
                history = JSON.parse(history);
                setData(history);
            }
        }
    }, [data]);

    const chartData = (data)
        .slice(-10)
        .map((value, i) => ({
            name: `Run #${i + 1}`,
            value: value,
        }));

    if (data.length === 0) {
        return <span>No history..</span>;
    }

    return (
        <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} tickFormatter={(tick) => `${tick}`} />
            <Tooltip formatter={(value) => `${value}`} />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
};

export default HistoryChart;
