import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

export const Donor2 = () => {
  const url = "https://api.github.com/users";
  const getPeople = async () => {
    const response = await fetch(url);
    const people = await response.json();
    setPeople(people);
  };
  const [People, setPeople] = useState([]);
  const [Index, setIndex] = useState(0);

  useEffect(() => getPeople(), []);

  useEffect(() => {
    const IntervalID = setInterval(
      () => setIndex(Index === People.length - 1 ? 0 : Index + 1),
      3000
    );
    return () => clearInterval(IntervalID);
  }, [Index]);

  const Button = () => {
    const onClick = (num) => {
      if (Index + num < 0) {
        return setIndex(0);
      }
      if (Index + num > People.length - 1) {
        return setIndex(People.length - 1);
      } else {
        setIndex(Index + num);
      }
    };
    const Before = () => (
      <button
        className="donor-main-btn donor-main-btn1"
        onClick={() => onClick(-1)}
      >{`${"<"}`}</button>
    );

    const After = () => (
      <button
        className="donor-main-btn donor-main-btn2"
        onClick={() => onClick(+1)}
      >{`${">"}`}</button>
    );

    if (Index === 0) {
      return <After />;
    }
    if (Index === People.length - 1) {
      return <Before />;
    } else {
      return (
        <div>
          <Before />
          <After />
        </div>
      );
    }
  };

  return (
    <section className="donor-section">
      <div className="donor-section-header">
        <h2>
          <span>/ </span>
           donor of this month
        </h2>
      </div>
      <div className="donor-section-main">
        {People.map((p, i) => {
          const { id, login, avatar_url } = p;
          if (i === Index) {
            return (
              <article className="donor-main-article" key={id}>
                {/* <FaQuoteLeft /> */}
                <h3 className="donor-main-thank-you">
                  thank you for your consideration{" "}
                </h3>
                <img
                  className="donor-main-img"
                  src={avatar_url}
                  alt={login}
                  width="150px"
                ></img>
                  <h4 className="donor-main-donor-name">{login}</h4>
                <FaQuoteRight className="donor-quote-icon"/>
              </article>
            );
          } else {
            return null;
          }
        })}
        <div>{<Button></Button>}</div>
      </div>
    </section>
  );
};
