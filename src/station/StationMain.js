import { Link } from "react-router-dom";
import Detail from "./Detail";
import List from "./List";
import { lastData, useStations } from "../modules/StationUtils";
import { useState } from "react";

const Main = () => {
  const { stationData } = useStations();
  const latestData = lastData(stationData);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const onClickHandler = (place) => {
    setSelectedPlace(place);
  };

  return (
    <>
      <section className="main">
        <article className="list">
          <List latestData={latestData} onClickHandler={onClickHandler} />
        </article>
        <article className="detail">
          <Detail selectedPlace={selectedPlace} stationData={stationData} />
        </article>
      </section>
      <div className="main">
        <div>
          <Link to="/once">전체보기</Link>
        </div>
        <div>
          <Link to="/weather">날씨</Link>
        </div>
      </div>
    </>
  );
};

export default Main;
