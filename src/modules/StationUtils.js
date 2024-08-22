import { useState, useEffect } from "react";
import axios from "axios";

const useStations = () => {
  const [stationData, setStationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await axios.get(
          "http://openapi.airgwangsan.kr:8080/Gwangsan/getDustDataAPI?apiId=01"
        );
        const items = response.data.response.items;

        const dataArray = items.map((item) => ({
          place: item.place,
          PM1: item.PM1,
          PM10: item.PM10,
          PM2_5: item.PM2_5,
          CO2: item.CO2,
          temperature: item.TEMPERATURE,
          humidity: item.HUMIDITY,
          latitude: item.LATITUDE,
          longitude: item.LONGITUDE,
          collectionDate: item.COLLECTION_DATE,
        }));

        const sortedData = dataArray.sort((a, b) => {
          const dateA = new Date(a.collectionDate);
          const dateB = new Date(b.collectionDate);
          return dateB - dateA;
        });

        const latestDataMap = new Map();
        sortedData.forEach((item) => {
          latestDataMap.set(item.place, item);
        });

        const latestData = Array.from(latestDataMap.values());
        setStationData(latestData);
      } catch (error) {
        console.error("데이터 요청 오류:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStationData();
  }, []);

  return { stationData, loading, error };
};

export default useStations;
