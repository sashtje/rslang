import React, {useState} from "react";

const SprintItem = ({cl, arr, el}) => {

  const basePath = 'https://react-learnwords-rs.herokuapp.com/';
  const [audio] = useState(new Audio(`${basePath}${el.audio}`));

  function playAudio() {
    audio.currentTime = 0;
    audio.play();
  }

  return (
    <div className={`sprintStats__${cl}`}>
      <div className="sprintStats__play-btn" onClick={()=>playAudio()}></div>
      <b>{el.word}</b> - {el.wordTranslate}
    </div>
  )
}

export default SprintItem
