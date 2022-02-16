import React from 'react';

const SprintGame = ({chosenLvl}) => {
  return (
    <div className="sprintGame__container">
      <div className="sprintGame__topLine">
        <div className="sprintGame-timer">60</div>

        <div className="sprintGame-pointer wrong"></div>

        <div className="sprintGame-score">70</div>
      </div>

      <div className="sprintGame__question">
        <div className="sprintGame__question-eng">develop</div>
        <div className="sprintGame__question-ru">развивать</div>
      </div>

      <div className="sprintGame__answer-container">
        <div className="btn sprintGame__answer-wrong">Неверно</div>
        <div className="btn sprintGame__answer-correct">Верно</div>
      </div>
    </div>
  )
}

export default SprintGame;