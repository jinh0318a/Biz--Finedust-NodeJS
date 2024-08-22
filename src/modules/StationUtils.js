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

// 각 place별로 최신 데이터를 추출하는 함수
const filterLatestData = (items) => {
  const latestData = {};

  items.forEach((item) => {
    const { place, COLLECTION_DATE } = item;
    // 최신 데이터가 아니면 업데이트
    if (
      !latestData[place] ||
      new Date(COLLECTION_DATE) > new Date(latestData[place].COLLECTION_DATE)
    ) {
      latestData[place] = item;
    }
  });

  return Object.values(latestData);
};

export { useStations, filterLatestData };
