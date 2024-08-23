import { useWeather, weatherList } from "../modules/WeatherUtils";

const Report = () => {
  const { data } = useWeather();

  return (
    <>
      <h1>날씨</h1>
      <div className="weather">
        <ul>{weatherList(data)}</ul>
      </div>
    </>
  );
};

export default Report;
