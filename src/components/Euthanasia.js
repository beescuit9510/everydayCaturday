// import {catImgs, names, cityCountry, catSpecies, birthday} from "../data/catData";
import React, { useState } from "react";
import { Cats } from "../data/catObject";

const List = ({ Cat, notInterested, refresh, isEmpty }) => {
  if (isEmpty()) {
    return <button onClick={refresh}>refresh</button>;
  } else {
    return (
      <React.Fragment>
        {Cat.map((cat) => {
          const { NotInterested, name, age, img, euthanizeDay, species, id } =
            cat;
          if (NotInterested) {
            return <div key={id}>...read more</div>;
          } else {
            return (
              <article key={id}>
                <p>{name}</p>
                <p>{age} years old</p>
                <img src={img} alt={species} width="50px" height="auto"></img>
                <p>{euthanizeDay} days left before euthnaizing</p>
                <button onClick={() => notInterested(id)}>
                  not interested
                </button>
              </article>
            );
          }
        })}
      </React.Fragment>
    );
  }
};

export const Euthanasia = () => {
  const [FullCatArr, setFullCatArr] = useState(Cats.filter((c) => c.euthanizeDay < 7));
  const [CatIndex, setCatIndex] = useState(3);
  const catArr = (CatIndex, FullCatArr) => FullCatArr.filter((c, i) => i < CatIndex);
  const [Cat, setCat] = useState(catArr(CatIndex, FullCatArr));


  const moreCats = () => {
    setCatIndex(CatIndex + 3);
    setCat(catArr(CatIndex, FullCatArr));
  };

  const notInterested = (ID) => {
    FullCatArr[
      FullCatArr.findIndex((c) => {
        let isC = c !== undefined ? true : false;
        return isC ? c.id === ID : false;
      })
    ].NotInterested = true;
    setCat(catArr(CatIndex, FullCatArr));
  };

  const refresh = () => {
    setFullCatArr(Cats.filter((c) => c.euthanizeDay < 7));
    FullCatArr.forEach((c) => (c.NotInterested = undefined));
    setCatIndex(3);
    setCat(catArr(CatIndex, FullCatArr));
  };

  const isEmpty = () => {
    return FullCatArr.every((c) => c.NotInterested === true);
  };

  const MoreCatNbutton = () => <button onClick={moreCats}>more cats</button>;

  return (
    <section>
      <h3>
        {FullCatArr.length} cats about to be euthanized within the next week
      </h3>
      <List
        Cat={Cat}
        notInterested={notInterested}
        refresh={refresh}
        isEmpty={isEmpty}
      ></List>
      {Cat.length === FullCatArr.length ? "end of page" : <MoreCatNbutton />}
    </section>
  );
};
