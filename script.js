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

// 프로그램이 정한 숫자와 플레이어가 입력한 숫자를 비교, 판단해서
// 플레이어에게 결과값을 보여준다.플레이어가 입력한 숫자중 첫번째 숫자가 프로그램이 정한 숫자의
// 첫번째 숫자와 일치하면 '스트라이크', 일치하지 않지만 플레이어의 첫번째
// 숫자가 프로그램에 숫자 안에 포함되어 있다면 '볼' 그리고 풀레이어의
// 세번째 숫자까지 반복한다.
function checkGuess(guess) {
  // 스트라이크와 볼의 값을 초기화한다.
  const result = { strikes: 0, balls: 0 };

  //스트라이크와 볼을 판별해서 result의 값에 표시한다.
  for (let i = 0; i < guess.length; i++) {
    //만약 게스의 i와 엔서의i가 완전히 일치한다면
    if (guess[i] === amswer[i]) {
      //리설트의 스트라이크 값을 1더한다.
      result.strikes++;
      //만약 게스의i가 엔서에 포한된다면
    } else if (answer.includes(guess[i])) {
      //리설트의 볼 값을 1더한다.
      result.balls++;
    }
  }

  //result의 값을 리턴한다.
  return result;
}

// 플레이어가 턴을 한번 종료했다면 다음턴을 시작하기 전에 남은 기회를
// 1 감소시킨다. 만약 스트라이크가 3개이면 '아웃'이라고 표시하고 플레이어의 승리로
// 게임이 종료된다. 만약 플레이어가 15번의 턴횟수를 모두 사용하고 승리를 하지 못한다면
// '콜드게임'이라고 표시하고 프로그램의 숫자를 표시하고 플레이어의 패배로
//  게임이 종료한다. 만약 게임이 종료된다면 플레이어의 입력창을 제거하고 스타트버튼을
// 표시한다.
