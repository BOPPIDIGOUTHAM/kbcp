import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

const Quiz = ({ data, questionNumber, setQuestionNumber, setTimeOut, prizeMoney }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const delay = (duration, callBack) => {
    setTimeout(() => {
      callBack();
    }, duration);
  };

  const handleClick = (item) => {
    setSelectedAnswer(item);
    setClassName("answer active");

    delay(3000, () => {
      setClassName(item.correct ? "answer correct" : "answer wrong");
    });

    delay(2000, () => {
      if (item.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
      }
    });
  };

  return (
    <div className="quiz-container">
      <div className="quiz">
        <div className="question">{question?.question}</div>
        <div className="answers">
          {question?.answers.map((item, index) => (
            <div
              key={index}
              className={selectedAnswer === item ? className : "answer"}
              onClick={() => !selectedAnswer && handleClick(item)}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
      <div className="prize-money-container">
        <div className="prize-money">
          ${prizeMoney}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
