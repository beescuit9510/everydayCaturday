import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

const DonorArticle = ({
  person: { id, avatar_url, login },
  userPage,
  prePerson,
  nextPerson,
}) => {
  return (
    <article>
      <div>
        <FaQuoteLeft />
        <h4>thank you for your consideration</h4>
        <p>{login}</p>
        <FaQuoteRight />
        <img src={avatar_url} alt={login} width="250px" height="auto"></img>
      </div>
      <div>
        <button onClick={prePerson}>
          <FaChevronLeft />
        </button>
        <button onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <button onClick={userPage}>go to user page of {login}</button>
    </article>
  );
};

export const Donor = () => {
  const [Index, setIndex] = useState(0);
  const [Person, setPerson] = useState([]);
  const url = "https://api.github.com/users";
  const [lastIndexNum, setLastIndexNum] = useState(0);

  const getUsers = async (url, Index) => {
    const response = await fetch(url);
    const users = await response.json();
    setLastIndexNum(users.length);
    setPerson(users[Index]);
  };

  useEffect(() => getUsers(url, Index), [url]);

  
  function checkNumber(num) {
    if (num < 0) {
        return lastIndexNum - 1;
    }
    if (num > lastIndexNum - 1) {
        return 0;
    } else {
      return num;
    }
  }
  const prePerson = () => {
    let i = checkNumber(Index - 1);
    setIndex(i);
    getUsers(url, i);
};
  const nextPerson = () => {
    let i = checkNumber(Index + 1);
    setIndex(i);
    getUsers(url, i);
  };
  
  const userPage = () => {
      
  };

  return (
    <section>
      <div>
        <h3>donor of this month</h3>
        <DonorArticle
          key={Person.id}
          person={Person}
          userPage={userPage}
          prePerson={prePerson}
          nextPerson={nextPerson}
        ></DonorArticle>
      </div>
    </section>
  );
};
