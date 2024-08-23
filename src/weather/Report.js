import { useWeather, weatherList } from "../modules/WeatherUtils";

const Report = () => {
  const { data } = useWeather();

  return (
    <>
      <div className="weather">{weatherList(data)}</div>
    </>
  );
};

export default Report;
