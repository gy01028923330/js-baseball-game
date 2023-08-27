let answer = [];
let attempts = 0;
const maxAttempts = 15;
let history = [];

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
    if (guess[i] === answer[i]) {
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
function makeGuess() {
  //넘버인풋을 게스인풋에 할당한다.
  const guessInput = document.getElementById("numberInput");
  //게스인풋 밸류를 게스밸류에 할당한다.
  const guessValue = guessInput.value;
  //게스밸류의 값을 각각 하나씩 나누고 숫자타입으로 바꾼것을 게스에
  //할당한다.
  const guess = guessValue.split("").map(Number);

  //게스를 콘솔에 나타낸다
  console.log(guess);
  //게스밸류의 길이를 콘솔에 나타낸다
  console.log(guessValue.length);

  //만약 게스밸류의 길이가 3보다 작다면
  if (guessValue.length < 3) {
    //경고문구를 띄운다
    alert("3개의 숫자를 입력하세요.");
    //함수탈출
    return;
  }

  //checkGuess함수를 guess를 인수로 넣어서 호출 한 것을 리설트에
  //할당한다.
  const result = checkGuess(guess);

  //시도횟수를 1더한다
  attempts++;
  //게스에 플레이어가 입력한 값을 나눈것을 할당하고 리설트에
  //프로그램이 판단한 스트라이크와 볼의 수를 할당한 것을 히스토리에
  //푸쉬한다
  history.push({ guess: guess, result: result });

  //만약 리설트의 스트라이크가 3과 완전히 일치한다면
  if (result.strikes === 3) {
    //html의 리설트를 승리문구로 할당한다
    document.getElementById("result").innerHTML = "승리! 축하합니다!";
    //html의 입력창을 없앤다
    document.getElementById("gameContainer").style.display = "none";
    //html의 시작버튼을 화면에 띄운다
    document.getElementById("gameStartContainer").style.display = "block";
    //만약 시도횟수가 최대시도횟수랑 완전히 일치한다면
  } else if (attempts === maxAttempts) {
    //html의 리설트를 패배문구로 할당한다
    document.getElementById("result").innerHTML =
      "패배! 정답은 " + answer.join("") + "입니다.";
    //html의 시작버튼을 화면에 띄운다
    document.getElementById("gameStartContainer").style.display = "block";
  } else {
    //패배가 아니면 리설트를 프로그램이 판단한 스트라이크와 볼의 수로
    //할당한다
    document.getElementById(
      "result"
    ).innerHTML = `${result.strikes} 스트라이크 ${result.balls}
    볼<br>(${attempts}/${maxAttempts} 턴)`;
  }
  updateHistory();
  guessInput.value = "";
}

function updateHistory() {
  //html의 히스토리를 히스토리div에 할당한다
  const historyDiv = document.getElementById("history");
  //히스토리div에 h3기록을 추가한다
  historyDiv.innerHTML = "<h3>기록</h3>";
  //히스토리 배열을 라운드에 할당한 반복문
  for (const round of history) {
    //라운드의 게스값을 ", "을 붙여 게스Str에 할당한다
    const guessStr = round.guess.join(", ");
    //스트라이크, 볼의 결과값을 리설트Str에 할당한다
    const resultStr = `${round.result.strikes} 스트라이크 ${round.result.balls} 볼`;
    //p태그를 라운드Info에 할당한다
    const roundInfo = document.createElement("p");
    //p태그에 게스스트링과 리설트스트링을 넣는다
    roundInfo.textContent = `${guessStr} - ${resultStr}`;
    //라운드인포를 html의 히스토리에 넣는다
    historyDiv.appendChild(roundInfo);
  }
}
