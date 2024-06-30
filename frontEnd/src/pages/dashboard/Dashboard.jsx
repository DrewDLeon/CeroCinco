import React, {useState, useEffect, useMemo} from 'react';
import { useLocation } from 'react-router-dom';
import StackedBarChart from '../../components/graphs/StackedBarChartcomponent';


function Dashboard() {
  const location = useLocation();
  // const { panelId } = location.state || {};
  const [panelDataHourly, setPanelDataHourly] = useState([]);
  const startDate = '2024-05-0 01:00:00';
  const endDate = '2024-05-30 00:00:00';
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/panels/hourly-data/${410}?start_date=${startDate}&end_date=${endDate}`);
        const data = await response.json();
        setPanelDataHourly(data.body.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    window.history.back();
  };

  console.log('panelDataHourly:', panelDataHourly);
  return (
    <div>
      <h2 >Dashboard</h2>
      <p>Panel: {410}</p>
      <button onClick={handleClick}>regresar</button>
      {panelDataHourly.length > 0 ? (
        <>
          <StackedBarChart data={panelDataHourly} />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Dashboard;