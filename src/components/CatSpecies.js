import fetch from "node-fetch";
import React, { useEffect, useState } from "react";

const Loading = () => {
  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
};

const Cats = ({ props }) => {
  return (
    <section>
      <div>
        <h3>Hello kitten</h3>
        {props.map((cat) => (
          <Cat key={cat.id} cat={cat}></Cat>
        ))}
      </div>
    </section>
  );
};

const Cat = ({ cat: { description, image, life_span, name, origin } }) => {
  const [Url, setUrl] = useState("");
  const [ReadMore, setReadMore] = useState(false)

  useEffect(() => {
    image
      ? setUrl(image.url)
      : setUrl(
          "https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=390&h=520&7E4B4CAD-CAE1-4726-93D6A160C2B068B2"
        );
  }, []);

  return (
    <article>
      <p>{name}</p>
      <p>origin: {origin}</p>
      <p>the average life span: {life_span}</p>
      <img src={Url} alt={name} width="50px" height="auto"></img>
      <p>{ReadMore ? description:`${description.substring(0,80)}...`}</p>
      <button onClick={()=>setReadMore(!ReadMore)}>{ReadMore ? "show less":"read more"}</button>
    </article>
  );
};


export const CatSpecies = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [CatArr, setCatArr] = useState([]);

  const url = "https://api.thecatapi.com/v1/breeds";

  const fetchCats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const cats = await response.json();
      setIsLoading(false);
      setCatArr(cats);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  if (IsLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  } else {
    return (
      <div>
        <Cats props={CatArr}></Cats>
      </div>
    );
  }
};
