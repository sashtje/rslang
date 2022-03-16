export function createOptions(numCurrQ, allData, numberAllQuestions) {
  let items = [];
  const numArr = [numCurrQ];

  items.push(allData[numCurrQ].wordTranslate);

  for (let i = 0; i < 4; i++) {
    let numberOpt = Math.floor(Math.random() * numberAllQuestions);

    while (numArr.includes(numberOpt)) {
      numberOpt = Math.floor(Math.random() * numberAllQuestions);
    }

    numArr.push(numberOpt);
    items.push(allData[numberOpt].wordTranslate);
  }

  items = shuffle(items);

  return items;
}

export function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

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