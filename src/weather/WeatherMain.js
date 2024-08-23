import { Link } from "react-router-dom";
import Report from "./Report.js";

const WeatherMain = () => {
  return (
    <section className="weather main">
      <Report />
      <div className="main">
        <div>
          <Link to="/">홈</Link>
        </div>
        <div>
          <Link to="/once">전체보기</Link>
        </div>
      </div>
    </section>
  );
};

export default WeatherMain;
