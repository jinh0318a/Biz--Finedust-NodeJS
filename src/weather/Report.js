import { useWeather, weatherList } from "../modules/WeatherUtils";

const Report = () => {
  const { data } = useWeather();

  return (
    <div>
      <h1>날씨</h1>
      <ul>{weatherList(data)}</ul>
    </div>
  );
};

export default Report;
