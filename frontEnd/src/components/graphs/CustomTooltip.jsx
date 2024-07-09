import React from 'react';
import "./CustomTooltip.css";

const formatLabel = (label, type) => {
  if (type === "hourly") {
    const hours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
                   "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
    return hours[label] || label; // Ensure label is within range
  } else if (type === "daily") {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[label] || label; // Ensure label is within range
  }

  return label; // Default label if type is not "hourly" or "daily"
};

const CustomTooltip = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{`${type == "hourly" ? "Hora: " : "Día: "}${formatLabel(label, type)}`}</p>
        <p className="intro">{`Impactos: ${Math.round(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
