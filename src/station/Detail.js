const Detail = () => {
  return (
    <>
      <div className="title">
        <h1>측정소</h1>
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
        <li>
          <span>미세먼지</span>
          <span>초미세먼지</span>
          <span>습도</span>
          <span>CO2</span>
          <span>측정시간</span>
        </li>
      </ul>
    </>
  );
};

export default Detail;
