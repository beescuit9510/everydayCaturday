import React, { useEffect, useState } from "react";

export const Quiz2 = () => {
  async function getData(url) {
    const response = await fetch(url);
    const quiz = await response.json();
    setQuiz(quiz.results);
  }

  const [Quiz, setQuiz] = useState([]);
  const [Count, setCount] = useState(0);
  const url = `https://opentdb.com/api.php?amount=${Count}`;

  useEffect(() => {
    getData(url);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(url);
  };
  console.log(Quiz.length);

  const handleSubmitAnswers = ()=>{
      return;
  }
  const submitAnswers = (e)=>{
e.preventDefault()

  }

  return (
    <section>
      <h3>Guess the questions to support stray cats and dogs</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">
          How many quiz would you challenge? (up to 50) :
        </label>
        <input
          type="number"
          min="1"
          max="50"
          name="amount"
          id="amount"
          value={Count}
          onChange={(e) => setCount(e.target.value)}
        ></input>
        <button type="submit">generate</button>
      </form>
      <form onSubmit={handleSubmitAnswers}>
      {Quiz.map((quiz, i) => {
        const {
          category,
          difficulty,
          question,
          incorrect_answers,
          correct_answer,
        } = quiz;
        const answers = [correct_answer, ...incorrect_answers];
        answers.sort();
        return (
          <article key={i}>
            <p>{category}</p>
            <p>{difficulty}</p>
            <p>{question}</p>
            {answers.map((answer) => {
              return (
                <ul>
                  <label>
                    <li>{answer}</li>
                    <input type="checkbox" className={i}></input>
                  </label>
                </ul>
              );
            })}
          </article>
        );
      })}
      <button type="submit" onClick={submitAnswers}>submit</button>
      </form>
    </section>
  );
};
