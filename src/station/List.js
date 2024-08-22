import React, { useState } from "react";
import { useStations } from "../modules/StationUtils";
import { filterLatestData } from "../modules/StationUtils";

const List = () => {
  const { stationData, loading, error } = useStations();
  const [searchTerm, setSearchTerm] = useState("");

  // 데이터 로딩 중이거나 에러가 있는 경우 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 최신 데이터 필터링
  const latestData = filterLatestData(stationData);

  // 검색 필터링
  const filteredData = latestData.filter((station) =>
    station.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>측정소</h1>
      <form>
        <input
          type="text"
          name="station"
          placeholder="측정소 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <ul className="finedust-list">
        {filteredData.length > 0 ? (
          filteredData.map((station, index) => (
            <li key={index}>
              <span>{station.place}</span>
            </li>
          ))
        ) : (
          <li>측정소가 없습니다.</li>
        )}
      </ul>
    </>
  );
};

export default List;
