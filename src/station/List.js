import React from "react";
import useStations from "../modules/StationUtils";

const List = () => {
  const { stationData, loading, error } = useStations();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>측정소</h1>
      <form>
        <input type="text" name="station" placeholder="측정소 검색" />
      </form>
      <ul className="finedust-list">
        {stationData && stationData.length > 0 ? (
          stationData.map((station, index) => (
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
