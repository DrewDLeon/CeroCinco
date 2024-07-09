import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';

const transformData = (data) => {
  return Object.keys(data).map(key => ({
    key: Number(key), // Convert key to number
    total: data[key]
  }));
};

const formatDataKey = (type) => {
  if (type === "hourly") {
    return "key";
  } else if (type === "daily") {
    return "key";
  }

  return "key";
};

const formatTick = (tick, type) => {
  if (type === "hourly") {
    const hours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
                   "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
    return hours[tick] || tick; // Ensure tick is within range
  } else if (type === "daily") {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[tick] || tick; // Ensure tick is within range
  }

  return tick; // Default tick if type is not "hourly" or "daily"
};

const StackedBarChart = ({ data, type }) => {
  const transformedData = transformData(data);
  const dataKey = formatDataKey(type);

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <BarChart data={transformedData} margin={{ top: 0, right: 0, left: 25, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={dataKey} 
          tickFormatter={(tick) => formatTick(tick, type)} 
        />
        <YAxis />
        <Tooltip content={<CustomTooltip type={type} />}/>
        <Bar dataKey="total" fill="#0D4B63" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
