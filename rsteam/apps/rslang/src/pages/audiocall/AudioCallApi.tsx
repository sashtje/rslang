import React from "react";

export function drawLives(num) {
  let items = []

  for (let i = 1; i <= 5; i++) {
    items.push(<div key={i} className={`audioGame__live ${i <= num ? 'active' : ''}`}></div>)
  }
  return items
}

export function getNewPage(arr) {
  let v = Math.floor(Math.random() * 30);
  if (arr.includes(v)) {
    getNewPage(arr)
  }
  return v
}

export function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}

export function createOptions(num, arr, func) {
  let items = [];
  const numArr = [];
  items.push(<div key={4} className="audioGame__option" onClick={()=>func(true)}>{arr[num].wordTranslate}</div>)

  for (let i = 0; i < 3; i++) {
    let v = Math.floor(Math.random() * 20);
    while (num === v || numArr.includes(v)) {
      v = Math.floor(Math.random() * 20);
    }
    numArr.push(v)
    items.push(<div key={i} className="audioGame__option" onClick={()=>func(false)}>{arr[v].wordTranslate}</div>)
  }
  items = shuffle(items)
  return items
}




function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

