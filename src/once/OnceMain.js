import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/main.css";

const AirQualityMap = () => {
  const [finedustList, setFinedustList] = useState([]);
  const mapRef = useRef(null); // 지도 참조를 위한 useRef

  useEffect(() => {
    // 지도 초기화
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([35.1525803, 126.8111572], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // 데이터 가져오기
    fetch("/api/finedust") // 실제 API 엔드포인트로 수정
      .then((response) => response.json())
      .then((data) => {
        setFinedustList(data);
      })
      .catch((error) => console.error("데이터 가져오기 실패:", error));
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  useEffect(() => {
    if (mapRef.current) {
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
  }, [finedustList]); // finedustList가 변경될 때마다 실행

  return (
    <div>
      <div
        id="map"
        style={{ height: "600px", width: "80%", margin: "0 auto" }}
      ></div>
      <div>
        <h2>광산구 평균 미세먼지 현황</h2>
        <p>데이터는 약 5분마다 갱신됩니다.</p>
        <table>
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
              <td>{/* PM10 데이터 */}</td>
              <td>{/* PM2_5 데이터 */}</td>
              <td>{/* CO2 데이터 */}</td>
              <td>{/* HUMIDITY 데이터 */}</td>
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
