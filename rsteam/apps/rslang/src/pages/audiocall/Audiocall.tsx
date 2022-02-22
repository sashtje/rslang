import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Audiocall = ({ lvlSelected = 1 }) => {
  const [selectedOption, setSelectedOption] = useState(lvlSelected);

  const setOption = (e) => {
    setSelectedOption(+e.target.value);
  };

  useEffect(() => {
    console.log(selectedOption);
  });

  return (
    <div className="sprint__wrapper">
      <div className="sprint__choosePage">
        <h1 className="textbook__title">Аудиовызов</h1>
        <p className="sprint__content">
          Аудиовызов - это тренировка на слух. Попробуй правильно распознать все слова и прокачай своё аудирование.
        </p>
        <div className="sprint__chooseLvl">
          <label className="sprint-select-label" htmlFor="audioGame-select">
            Сложность
          </label>
          <select className="sprint-select" id="audioGame-select" onChange={setOption}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <Link to={`/audiocall/${selectedOption}`} className="btn">
            Начать игру
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Audiocall;
