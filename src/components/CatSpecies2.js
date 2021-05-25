import React, { useEffect, useState } from "react";
import { Donor2 } from "./Donor2";

// import getData from "../data/catApi";

const Origin = ({ Cat, setFilter }) => {
  const origins = [...new Set(Cat.map((c) => c.origin))];
  return (
    <div>
      {origins.map((origin) => {
        return (
          <button
            className="cat-btn-origin"
            key={origin}
            onClick={() => setFilter(origin)}
          >
            {origin}
          </button>
        );
      })}
    </div>
  );
};

const BodyFeatures = ({ Cat, setFilteredCats, setFirst }) => {
  const body = ["hairless", "natural", "rare", "suppressed_tail", "short_legs"];
  const onClick = (e) => {
    setFilteredCats(Cat.filter((c) => c[`${e.target.value}`] === 1));
    setFirst(false);
  };

  return (
    <div>
      {body.map((b) => {
        return (
          <button
            className="cat-btn-body-features"
            key={b}
            onClick={onClick}
            value={b}
          >
            {b}
          </button>
        );
      })}
    </div>
  );
};

const Property = ({ Cat, setFilteredCats, setFirst }) => {
  const properties = [
    "adaptability",
    // "affection_level",
    "child_friendly",
    // "dog_friendly",
    "energy_level",
    "grooming",
    // "health_issues",
    "intelligence",
    // "shedding_level",
    // "social_needs",
    // "stranger_friendly",
  ];

  const onClick = (e) => {
    setFilteredCats(Cat.filter((c) => c[`${e.target.value}`] > 3));
    setFirst(false);
  };

  return (
    <div>
      {properties.map((p) => {
        return (
          <button
            className="cat-btn-personality"
            key={p}
            onClick={onClick}
            value={p}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};

const ReadMore = ({ Cat }) => {
  const {
    origin,
    affection_level,
    child_friendly,
    dog_friendly,
    energy_level,
    grooming,
    health_issues,
    intelligence,
    shedding_level,
    social_needs,
    stranger_friendly,
    hairless,
    natural,
    rare,
    suppressed_tail,
    short_legs,
  } = Cat;

  const [ShowMore, setShowMore] = useState(false);

  const Show = () => {
    return (
      <div className="cat-article-read-more">
        <p>affection level: {affection_level} out of 5</p>
        <p>child friendly: {child_friendly} out of 5</p>
        {/* <p>dog friendly:  {dog_friendly} out of 5</p> */}
        <p>energy level: {energy_level} out of 5</p>
        <p>grooming: {grooming} out of 5</p>
        <p>health issues: {health_issues} out of 5</p>
        <p>intelligence: {intelligence} out of 5</p>
        {/* <p>shedding level:  {shedding_level} out of 5</p>
        <p>social needs:  {social_needs} out of 5</p>
        <p>stranger friendly:  {stranger_friendly} out of 5</p> */}
        {/* <div>
          <h5>features:</h5>
          <p>originated from {origin}</p>
          <p>{hairless ? "hairless" : null}</p>
          <p>{natural ? "natural species" : null}</p>
          <p>{rare ? "rare sepcies" : null}</p>
          <p>{suppressed_tail ? "suppressed_tail" : null}</p>
          <p>{short_legs ? "short_legs" : null}</p>
        </div> */}
      </div>
    );
  };

  return (
    <div>
      {ShowMore && <Show />}
      <button className="cat-show-btn" onClick={() => setShowMore(!ShowMore)}>
        {ShowMore ? "show less" : "...read more"}
      </button>
    </div>
  );
};

const Classify = ({ Cat }) => {
  const defaultImg =
    "https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=390&h=520&7E4B4CAD-CAE1-4726-93D6A160C2B068B2";
  return (
    <div>
      {Cat.map((c) => {
        const { id, name, origin, description, life_span, image, temperament } =
          c;

        return (
          <article className="cat-article" key={id}>
            <div className="cat-article-col cat-article-col1">
              <img
                className="cat-img"
                src={image ? image.url : defaultImg}
                alt={name}
                width="150px"
                height="auto"
              ></img>
            </div>
            <div className="cat-article-col cat-article-col2">
              <h4 className="cat-article-name">{name}</h4>
              <p className="cat-article-life-span">
                the average life span: {life_span}
              </p>
              <p className="cat-article-origin">origin: {origin}</p>
              <p className="cat-article-description">{description}</p>
              <p className="cat-article-temperament">{temperament}</p>
              <ReadMore Cat={c}></ReadMore>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export const CatSpecies2 = () => {
  const url = "https://api.thecatapi.com/v1/breeds";
  const getCat = async () => {
    const response = await fetch(url);
    const Cat = await response.json();
    setCat(Cat);
    setLoading(false);
  };

  useEffect(() => getCat(), [url]);
  const [Cat, setCat] = useState([]);
  const [Filter, setFilter] = useState("all");
  const [FilteredCats, setFilteredCats] = useState(Cat);
  const [First, setFirst] = useState(true);

  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (Filter === "all") {
      setFirst(true);
    } else {
      setFirst(false);
      setFilteredCats(Cat.filter((c) => c.origin === Filter));
    }
  }, [Filter]);

  if (Loading) {
    return <div>Loading...</div>;
  }
  if (Loading === false) {
    return (
      <div class="cat-species-root-div">
        <section>
          <header>
            <h2 className="cat-header">everyday is a Caturday</h2>
          </header>
          <main class="cat-species-main">
            <div className="cat-species-main-div">
              <div className="cat-btns">
                <div>
                  <button
                    className="cat-btn-all"
                    onClick={() => setFirst(true)}
                  >
                    all
                  </button>
                </div>
                {/* <Origin Cat={Cat} setFilter={setFilter} /> */}
                <Property
                  Cat={Cat}
                  setFilteredCats={setFilteredCats}
                  setFirst={setFirst}
                />
                <BodyFeatures
                  Cat={Cat}
                  setFilteredCats={setFilteredCats}
                  setFirst={setFirst}
                />
              </div>
              <div className="cat-articles">
                <Classify Cat={First ? Cat : FilteredCats}></Classify>
              </div>
            </div>
            <aside class="donor-aside">
              <Donor2></Donor2>
            </aside>
          </main>
        </section>
      </div>
    );
  }
};
