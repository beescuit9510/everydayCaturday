import React, { useState } from "react";
import Values from "values.js";

// function componenetToHex(c) {
//   var hex = c.toString(16);
//   return hex.length == 1 ? "0" + hex : hex;
// }
// function rgbToHex(r, g, b) {
//   return "#" + componenetToHex(r) + componenetToHex(g) + componenetToHex(b);
// }

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [Alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  
  const onClick = () => {
    setAlert(true);
    navigator.clipboard.writeText(hexColor);
    setTimeout(() => setAlert(false), 3000);
};

  return (
      <article
      onClick={onClick}
      className={`color ${index > 10 && "color-light"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      >
      <p>{weight}%</p>
      <p>#{hexColor}</p>
      {Alert && <p>copied to clipboard</p>}
    </article>
  );
};

export const ColorGenerator = () => {
    const [Color, setColor] = useState("");
    const [Divide, setDivide] = useState(undefined);
    const [Error, setError] = useState(false);
    const [List, setList] = useState(new Values("#3443eb").all(20));
    
    const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(Color ||"#3443eb").all(Divide || 20);
      setList(colors);

    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <section>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={Color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#3443eb"
            className={`${Error ? "error" : null}`}
          ></input>
          <label htmlFor="divide">divide 100 per cent by :</label>
          <input
            type="text"
            value={Divide}
            onChange={(e) => setDivide(parseInt(e.target.value, 0))}
            placeholder="20"
            id="divide"
          ></input>
          <button type="submit">submit</button>
        </form>
      </section>
      <section>
        {List.map((color, i) => {
          return (
            <SingleColor key={i} {...color} index={i} hexColor={color.hex} />
          );
        })}
      </section>
    </React.Fragment>
  );
};
