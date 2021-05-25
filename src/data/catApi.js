const fetch = require("node-fetch");

async function getData(url, setData) {
  const response = await fetch(url);
  const cats = await response.json();
  return cats.map(c=>c)
}

export default getData;
