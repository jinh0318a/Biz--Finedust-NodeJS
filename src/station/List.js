import React, { useState } from "react";
import { useStations, lastData } from "../modules/StationUtils";

const List = () => {
  const { stationData, loading, error } = useStations();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const latestData = lastData(stationData);

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
          filteredData.map((station) => (
            <li>
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
