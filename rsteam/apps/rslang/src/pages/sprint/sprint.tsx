import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../context';
import SprintGame from './sprintGame';

const Sprint = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {gameSet, setGameSet} = useContext(GameContext);

  const setOption = (e) => {
    setSelectedOption(+e.target.value);
  };

  const setChosenGroup = () => {
    if (selectedOption === null) {
      setSelectedOption(0);
      setGameSet({
        ...gameSet,
        group: 0
      });
    } else {
      setGameSet({
          ...gameSet,
          group: selectedOption
        });
    }
  };

  if (!gameSet.isTxb && gameSet.group === null) {
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
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
              <option value="4">5</option>
              <option value="5">6</option>
            </select>
            <button
              className="btn"
              onClick={setChosenGroup}
            >
              Начать игру
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SprintGame />
  );
};

export default Sprint;
