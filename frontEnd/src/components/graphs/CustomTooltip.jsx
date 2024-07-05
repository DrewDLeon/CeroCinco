import React from 'react';
import "./CustomTooltip.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{`${Math.round(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;