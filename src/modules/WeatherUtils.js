import React, { useState, useEffect } from "react";
import key from "../key";

const useWeather = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // 오류 상태 추가

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const now = new Date();
        const kstOffset = 9 * 60 * 60 * 1000; // KST는 UTC+9
        const kstDate = new Date(now.getTime() + kstOffset);

        const baseDate = kstDate.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
        const hours = kstDate.getUTCHours();
        const baseTime = `${(hours - 1).toString().padStart(2, "0")}00`; // HH00

        const mykey = key;
        const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${mykey}&numOfRows=40&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=57&ny=74`;

        const response = await fetch(url);
        const result = await response.json();

        if (
          result.response &&
          result.response.body &&
          result.response.body.items &&
          Array.isArray(result.response.body.items.item)
        ) {
          const items = result.response.body.items.item;
          setData(items);
        } else {
          console.error("아이템을 찾을 수 없거나 구조가 올바르지 않습니다.");
          setData([]);
        }
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        setError(error); // 오류 상태 업데이트
      }
    };

    fetchWeatherData();
  }, []);

  return { data, error }; // 오류 상태 반환
};

// 데이터를 시간별로 그룹화하는 함수
const groupByTime = (data) => {
  return data.reduce((acc, item) => {
    const timeKey = item.fcstTime; // 시간 기준으로 그룹화
    if (!acc[timeKey]) {
      acc[timeKey] = [];
    }
    acc[timeKey].push(item);
    return acc;
  }, {});
};

// 알 수 없는 데이터 항목을 필터링하는 함수
const isValidItem = (item) => {
  switch (item.category) {
    case "RN1":
    case "SKY":
    case "T1H":
    case "REH":
      return item.fcstValue !== "알 수 없음";
    default:
      return false;
  }
};

const getWeatherValue = (item) => {
  switch (item.category) {
    case "RN1":
      return item.fcstValue === "강수없음"
        ? "강수없음"
        : `${item.fcstValue}mm/h`;
    case "SKY":
      return (
        {
          1: "맑음",
          3: "구름많음",
          4: "흐림",
        }[item.fcstValue] || "알 수 없음"
      );
    case "T1H":
      return `${item.fcstValue}°C`;
    case "REH":
      return `${item.fcstValue}%`;
    default:
      return "알 수 없음";
  }
};

// 시간별로 묶어서 테이블로 변환하는 함수
const weatherList = (data) => {
  if (!data || data.length === 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td colSpan="4">날씨정보가 없습니다</td>
          </tr>
        </tbody>
      </table>
    );
  }

  const groupedData = groupByTime(data);

  return (
    <table>
      <thead>
        <tr>
          <th>시간</th>
          <th>날씨</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedData).map(([time, items]) => {
          const validItems = items.filter(isValidItem);

          if (validItems.length === 0) {
            return null;
          }

          return (
            <React.Fragment key={time}>
              <tr>
                <td rowSpan={validItems.length}>{time}</td>
                <td>{getWeatherValue(validItems[0])}</td>
              </tr>
              {validItems.slice(1).map((item, index) => (
                <tr key={index}>
                  <td>{getWeatherValue(item)}</td>
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export { useWeather, weatherList };
