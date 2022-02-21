import React, { useState, useEffect } from 'react';
import SprintGame from './sprintGame';
import { Link } from 'react-router-dom';

// const selectOptions = [
//   {value: 1},
//   {value: 2},
//   {value: 3},
//   {value: 4},
//   {value: 5},
//   {value: 6}
// ];

const Sprint = ({ lvlSelected = 1 }) => {
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
        <h1 className="textbook__title">Спринт</h1>
        <p className="sprint__content">
          Спринт - это тренировка на скорость. Попробуй угадать как можно больше слов за 60 секунд.
        </p>
        <div className="sprint__chooseLvl">
          <label className="sprint-select-label" htmlFor="sprint-select">
            Сложность
          </label>
          <select className="sprint-select" id="sprint-select" onChange={setOption}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <Link to={`/sprint-game/${selectedOption}`} className="btn">
            Начать игру
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
