import { Link } from "react-router-dom";
import Detail from "./Detail";
import List from "./List";

const Main = () => {
  return (
    <>
      <section className="main">
        <article className="list">
          <List />
        </article>
        <article className="detail">
          <Detail />
        </article>
      </section>
      <div className="main">
        <Link to="/once">전체보기</Link>
      </div>
    </>
  );
};

export default Main;
