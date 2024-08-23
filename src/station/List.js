import React, { useState } from "react";
import { searchStation } from "../modules/StationUtils";

const List = ({ latestData, onClickHandler }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchStation(latestData, searchTerm);

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
            <li key={station.place}>
              <span
                className="place"
                onClick={() => onClickHandler(station.place)}
              >
                {station.place}
              </span>
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
