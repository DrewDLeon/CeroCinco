const tbl_impactos = require("../models/tbl_impactos");

const findTotalImpactos = (data) => {
  let total = 0;

  data.forEach((element) => {
    total += element.total_impactos;
  });

  return total;
};

const findAverageDaily = (data) => {
  const total = findTotalImpactos(data);
  const uniqueDays = new Set();

  data.forEach((element) => {
    const datePart = element.fechayhora.getUTCFullYear() + '-' + element.fechayhora.getUTCMonth() + '-' + element.fechayhora.getUTCDate();
    uniqueDays.add(datePart); 
  });

  const days = uniqueDays.size

  return total / days;
};

const findTopHour = (data) => {
  const hourTotalDict = {};
  const hourNumElements = {};

  data.forEach((element) => {
    const hour = new Date(element.fechayhora).getUTCHours(); // Asegurarse de que fechayhora es un objeto Date

    if (!hourTotalDict[hour]) {
      hourTotalDict[hour] = 0;
    }

    if (!hourNumElements[hour]) {
      hourNumElements[hour] = 0;
    }

    hourTotalDict[hour] += element.total_impactos; // Sumar los impactos para esa hora
    hourNumElements[hour] += 1;
  });

  const hourAverageDict = {};

  for (const [hour, totalImpactos] of Object.entries(hourTotalDict)) {
    hourAverageDict[hour] = totalImpactos / hourNumElements[hour]; // Calcular el promedio
  }

  let topHour = null;
  let maxAverageImpactos = -1;

  // Encontrar la hora con el mayor promedio de impactos
  for (const [hour, averageImpactos] of Object.entries(hourAverageDict)) {
    if (averageImpactos > maxAverageImpactos) {
      maxAverageImpactos = averageImpactos;
      topHour = hour;
    }
  }

  return topHour;
};


const impactosController = {
  getKpiData: async (req, res) => {
    const {idPantalla, beginDate, endDate, startHour, endHour} = req.body;

    data = await tbl_impactos.getImpactosFrom(idPantalla, beginDate, endDate, startHour, endHour);

    const totalImpactos = findTotalImpactos(data);
    const averageDaily = findAverageDaily(data);
    const topHour = findTopHour(data);

    res.json({totalImpactos, averageDaily, topHour});
  },

  getHourlyData: async (req, res) => {
    const {idPantalla, beginDate, endDate, startHour, endHour} = req.body;
    
    data = await tbl_impactos.getImpactosFrom(idPantalla, beginDate, endDate, startHour, endHour);

    const hourTotalDict = {};
    const hourNumElements = {};

    data.forEach((element) => {
      const hour = element.fechayhora.getUTCHours();
  
      if (!hourTotalDict[hour]) {
        hourTotalDict[hour] = 0;
      }

      if (!hourNumElements[hour]) {
        hourNumElements[hour] = 0;
      }
  
      hourTotalDict[hour] += element.total_impactos;
      hourNumElements[hour] += 1;
    });

    const hourAverageDict = {};

    for (const [hour, totalImpactos] of Object.entries(hourTotalDict)) {
      hourAverageDict[hour] = totalImpactos / hourNumElements[hour];
    }

    res.json(hourAverageDict);
  },

  getDailyData: async (req, res) => {
    const {idPantalla, beginDate, endDate, startHour, endHour} = req.body;
    
    data = await tbl_impactos.getImpactosFrom(idPantalla, beginDate, endDate, startHour, endHour);

    const dailyTotalDict = {};
    const dailyNumElements = {};
    const usedDates = new Set();

    data.forEach((element) => {
      const day = element.fechayhora.getUTCDay();
      const date = element.fechayhora.getUTCDate();

      if (!dailyTotalDict[day]) {
        dailyTotalDict[day] = 0;
      }

      if (!dailyNumElements[day]) {
        dailyNumElements[day] = 0;
      }

      if (!usedDates.has(date)) {
        usedDates.add(date);
        dailyNumElements[day] += 1;
      }

      dailyTotalDict[day] += element.total_impactos;
    });

    const dailyAverageDict = {};

    for (const [day, totalImpactos] of Object.entries(dailyTotalDict)) {
      dailyAverageDict[day] = totalImpactos / dailyNumElements[day];
    }

    res.json(dailyAverageDict);
  },
};

module.exports = impactosController;