//0~9까지 숫자중 중복되지 않는 3가지 숫자를 만드는 함수
function generateAnswer() {
  const numbers = [];
  while (numbers.length < 3) {
    const num = Math.floor(Math.random() * 10);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  console.log(numbers);
  return numbers;
}

function startGame() {
  document.getElementById("gameContainer").style.display = "block";
  //<div id="gameContainer" style="display: none">
  document.getElementById("gameStartContainer").style.display = "none";
  // <div id="gameStartContainer">
  //     <p>게임을 시작하려면 '시작' 버튼을 눌러주세요.</p>
  //     <button onclick="startGame()">시작</button>
  // </div>
  answer = generateAnswer();
  attempts = 0;
  history = [];
  document.getElementById("result").innerHTML = "";
  document.getElementById("history").innerHTML = "";
}
