import { useEffect } from "react";
import { colorHandlerDetail } from "../modules/CssUtils";
const Detail = ({ selectedPlace, stationData }) => {
  useEffect(() => {
    colorHandlerDetail();
  }, [selectedPlace, stationData]);
  if (!selectedPlace) {
    return <h1>측정소를 선택해주세요.</h1>;
  }
  const placeData = stationData.filter((item) => item.place === selectedPlace);

  return (
    <>
      <div className="title">
        <h1>{selectedPlace} 측정소</h1>
        <div className="description">
          <span className="good">좋음</span>
          <span className="normal">보통</span>
          <span className="bad">나쁨</span>
          <span className="verybad">매우나쁨</span>
        </div>
      </div>
      <ul className="finedust-list">
        <li className="head">
          <span>미세먼지(μg/m3)</span>
          <span>초미세먼지(μg/m3)</span>
          <span>습도(%)</span>
          <span>CO2(ppm)</span>
          <span>측정시간</span>
        </li>
        {placeData.length > 0 ? (
          placeData.map((item, index) => (
            <li key={index}>
              <span className="PM10">{item.PM10}</span>
              <span className="PM25">{item.PM2_5}</span>
              <span>{item.HUMIDITY}</span>
              <span>{item.CO2}</span>
              <span>{item.COLLECTION_DATE}</span>
            </li>
          ))
        ) : (
          <li>선택된 측정소의 데이터를 찾을 수 없습니다.</li>
        )}
      </ul>
    </>
  );
};

export default Detail;
