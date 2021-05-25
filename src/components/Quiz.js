import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const randomId = () => Math.floor(Math.random() * 1000000 + 1);

export const Quiz = () => {
  const getQuiz = async () => {
    if (Challenge === 0) {
      return;
    }
    const response = await fetch(url);
    const quiz = await response.json();
    quiz.results.forEach((q) => (q.id = randomId()));
    setQuiz(quiz.results);
  };

  const [Quiz, setQuiz] = useState([]);

  // const [Challenge, setChallenge] = useState(10);
  const Challenge = 5;
  let url = `https://opentdb.com/api.php?amount=${Challenge}`;

  const [ShowAnswer, setShowAnswer] = useState(false);

  useEffect(() => getQuiz(), [url]);

  //   const Onchange =(e)=>setChallenge(e.target.value);

  //     if (Challenge===0) {
  //       return (
  //         <div>
  //           <h3>Ready to challenge?</h3>
  //           <h4>how many quesitons do you want to challenge?</h4>
  //           <form action="submit">
  //             <input
  //               type="text"
  //               name="chanllenge"
  //               placeholder="Enter a number"
  //               value={Challenge}
  //               onChange={Onchange}
  //             ></input>
  //             <button type="submit">click</button>
  //           </form>
  //         </div>
  //       );
  //     }

  //   if (Challenge > 0) {
  return (
    <section>
      <h3>answer questions and support stray cats and dogs!</h3>
      {Quiz.map((q) => {
        const { question, id, category, difficulty, correct_answer } = q;
        return (
          <article key={id}>
            <p>{category}</p>
            <p>{difficulty}</p>
            <p>{question}</p>
            {ShowAnswer && <p> {correct_answer}</p>}
            <button onClick={() => setShowAnswer(!ShowAnswer)}>
              {ShowAnswer ? <AiOutlineMinus/>:<AiOutlinePlus/>}
            </button>
          </article>
        );
      })}
    </section>
  );
  //   }
};
