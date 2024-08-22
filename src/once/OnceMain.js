import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/main.css";
import { useStations, lastData, average } from "../modules/StationUtils";
import { colorHandlerOnce } from "../modules/CssUtils";

const AirQualityMap = () => {
  const [finedustList, setFinedustList] = useState([]);
  const mapRef = useRef(null);
  const { stationData } = useStations();
  const avgData = average(stationData);
  useEffect(() => {
    if (stationData.length > 0) {
      const latestData = lastData(stationData);
      setFinedustList(latestData);
    }
  }, [stationData]);

  useEffect(() => {
    // 지도 초기화
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([35.1525803, 126.8111572], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // 마커 추가
    if (mapRef.current && finedustList.length > 0) {
      finedustList.forEach((finedust) => {
        const lat = parseFloat(finedust.LATITUDE);
        const lon = parseFloat(finedust.LONGITUDE);

        if (!isNaN(lat) && !isNaN(lon)) {
          const marker = L.marker([lat, lon]).addTo(mapRef.current);
          marker.bindPopup(
            `<b>${finedust.place}</b><br>` +
              `미세먼지: ${finedust.PM10}<br>` +
              `초미세먼지: ${finedust.PM2_5}<br>` +
              `CO2: ${finedust.CO2}<br>` +
              `습도: ${finedust.HUMIDITY}<br>` +
              `측정시간: ${finedust.COLLECTION_DATE}`
          );
        } else {
          console.error("잘못된 위도 또는 경도:", finedust);
        }
      });
    }
  }, [finedustList]);

  useEffect(() => {
    colorHandlerOnce();
  });

  return (
    <div className="once">
      <div
        id="map"
        style={{ height: "600px", width: "80%", margin: "0 auto" }}
      ></div>
      <div>
        <h2>광산구 평균 미세먼지 현황</h2>
        <p>데이터는 약 5분마다 갱신됩니다.</p>
        <table className="avgList">
          <thead>
            <tr>
              <th>미세먼지(µg/m³)</th>
              <th>초미세먼지(µg/m³)</th>
              <th>CO2(ppm)</th>
              <th>습도(%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="PM10">{avgData.avgPM10}</td>
              <td className="PM25">{avgData.avgPM2_5}</td>
              <td>{avgData.avgCO2}</td>
              <td>{avgData.avgHumidity}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="back">
        <a href="/">돌아가기</a>
      </div>
    </div>
  );
};

export default AirQualityMap;
