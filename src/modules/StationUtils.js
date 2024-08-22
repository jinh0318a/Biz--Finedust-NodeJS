import { useState, useEffect } from "react";

const useStations = () => {
  const [stationData, setStationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("/Gwangsan/getDustDataAPI?apiId=01");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        // Check if 'response' and 'items' exist in the data
        if (result.response && result.response.items) {
          setStationData(result.response.items);
        } else {
          throw new Error("Unexpected JSON structure");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return { stationData, loading, error };
};

const lastData = (items) => {
  const latestData = {};

  items.forEach((item) => {
    const { place, COLLECTION_DATE } = item;

    if (
      !latestData[place] ||
      new Date(COLLECTION_DATE) > new Date(latestData[place].COLLECTION_DATE)
    ) {
      latestData[place] = item;
    }
  });

  return Object.values(latestData);
};

const searchStation = (items, word) => {
  return items.filter((item) =>
    item.place.toLowerCase().includes(word.toLowerCase())
  );
};

const average = (data) => {
  if (data.length === 0) {
    return {
      avgPM10: 0,
      avgPM2_5: 0,
      avgCO2: 0,
      avgHumidity: 0,
    };
  }

  let totalPM10 = 0;
  let totalPM2_5 = 0;
  let totalCO2 = 0;
  let totalHumidity = 0;

  data.forEach((item) => {
    totalPM10 += parseFloat(item.PM10) || 0;
    totalPM2_5 += parseFloat(item.PM2_5) || 0;
    totalCO2 += parseFloat(item.CO2) || 0;
    totalHumidity += parseFloat(item.HUMIDITY) || 0;
  });

  const count = data.length;

  return {
    avgPM10: (totalPM10 / count).toFixed(2),
    avgPM2_5: (totalPM2_5 / count).toFixed(2),
    avgCO2: (totalCO2 / count).toFixed(2),
    avgHumidity: (totalHumidity / count).toFixed(2),
  };
};

export { useStations, lastData, searchStation, average };
