import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatDataKey = (type) => {
  if (type === "hourly") {
    return "hour";
  } else if (type === "daily") {
    return "day";
  } else if (type === "monthly") {
    return "month";
  }
  return "key";
};

const formatTick = (tick, type) => {
  if (type === "hourly") {
    const hours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
                   "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
    return hours[tick];
  } else if (type === "daily") {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[tick];
  } else if (type === "monthly") {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months[tick - 1];
  }
  return tick;
};

const StackedBarChart = ({ data, type, beginHour, endHour }) => {
  const dataKey = formatDataKey(type);

  if (type === "hourly") {
    data = data.filter(d => d.hour >= beginHour && d.hour <= endHour);
  }

  return (
    <ResponsiveContainer width="100%" minHeight={300} height="100%" >
      <BarChart data={data} margin={{ top: 0, right: 0, left: 25, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={dataKey} 
          tickFormatter={tick => formatTick(tick, type)} 
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#0D4B63" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
