import React from "react";

const Detail = ({ selectedPlace, stationData }) => {
  if (!selectedPlace) {
    return <p>측정소를 선택해주세요.</p>;
  }

  const placeData = stationData.filter((item) => item.place === selectedPlace);

  return (
    <>
      <div className="title">
        <h1>{selectedPlace} 측정소</h1>
        <div className="description">
          <span>좋음</span>
          <span>보통</span>
          <span>나쁨</span>
          <span>매우나쁨</span>
        </div>
      </div>
      <ul className="finedust-list">
        <li>
          <span>미세먼지(μg/m3)</span>
          <span>초미세먼지(μg/m3)</span>
          <span>습도(%)</span>
          <span>CO2(ppm)</span>
          <span>측정시간</span>
        </li>
        {placeData.length > 0 ? (
          placeData.map((item, index) => (
            <li key={index}>
              <span>{item.PM10}</span>
              <span>{item.PM2_5}</span>
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
