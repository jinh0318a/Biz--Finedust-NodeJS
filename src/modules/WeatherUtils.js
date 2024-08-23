import { useState, useEffect } from "react";
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

const weatherList = (data) => {
  if (!data || data.length === 0) {
    return <li>날씨정보가 없습니다</li>;
  }

  return data
    .map((item) => {
      let weather = "";
      let info = "";

      switch (item.category) {
        case "PTY":
          info = "강수형태";
          weather =
            {
              0: "없음",
              1: "비",
              2: "비/눈",
              3: "눈",
              5: "빗방울",
              6: "빗방울눈날림",
              7: "눈날림",
            }[item.fcstValue] || "알 수 없음";
          break;

        case "RN1":
          info = "강수량";
          weather =
            item.fcstValue === "강수없음"
              ? "강수없음"
              : `${item.fcstValue}mm/h`;
          break;

        case "SKY":
          info = "하늘상태";
          weather =
            {
              1: "맑음",
              3: "구름많음",
              4: "흐림",
            }[item.fcstValue] || "알 수 없음";
          break;

        case "T1H":
          info = "기온";
          weather = `${item.fcstValue}°C`;
          break;

        case "REH":
          info = "습도";
          weather = `${item.fcstValue}%`;
          break;

        default:
          return null;
      }

      return (
        <li key={`${item.fcstDate}-${item.fcstTime}`}>
          {info} {item.fcstDate} {item.fcstTime} {weather}
        </li>
      );
    })
    .filter(Boolean);
};

export { useWeather, weatherList };
